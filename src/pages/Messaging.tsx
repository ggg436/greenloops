import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Search, ChevronLeft, MoreHorizontal, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { auth, db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp, 
  where, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc,
  Timestamp,
  setDoc 
} from 'firebase/firestore';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type User = {
  id: string;
  displayName: string;
  photoURL: string;
  online?: boolean;
};

type Message = {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Timestamp;
};

type Chat = {
  id: string;
  participants: string[];
  participantNames: Record<string, string>;
  participantPhotos?: Record<string, string>;
  lastMessage: string;
  lastMessageTime: Timestamp;
  unreadCounts?: Record<string, number>;
};

const Messaging = () => {
  const { t } = useTranslation();
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [newChatDialogOpen, setNewChatDialogOpen] = useState(false);
  const [searchUserTerm, setSearchUserTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = auth.currentUser;

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      if (!currentUser) return;

      try {
        const usersQuery = query(collection(db, 'users'));
        const querySnapshot = await getDocs(usersQuery);
        
        const usersList: User[] = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          // Don't include current user in the list
          if (doc.id !== currentUser.uid) {
            usersList.push({
              id: doc.id,
              displayName: userData.displayName || 'Unknown User',
              photoURL: userData.photoURL || '',
              online: userData.online || false
            });
          }
        });
        
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to load users');
      }
    };

    fetchUsers();
  }, [currentUser]);

  // Fetch chats for current user
  useEffect(() => {
    const fetchChats = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        const chatsQuery = query(
          collection(db, 'chats'),
          where('participants', 'array-contains', currentUser.uid)
        );
        
        const unsubscribe = onSnapshot(chatsQuery, async (snapshot) => {
          const chatsList: Chat[] = [];
          
          for (const docChange of snapshot.docChanges()) {
            const chatData = docChange.doc.data() as Chat;
            chatData.id = docChange.doc.id;
            
            // Ensure participant names are populated
            if (!chatData.participantNames) {
              chatData.participantNames = {};
              chatData.participantPhotos = {};
              
              for (const participantId of chatData.participants) {
                if (participantId === currentUser.uid) {
                  chatData.participantNames[participantId] = 'You';
                  chatData.participantPhotos[participantId] = currentUser.photoURL || '';
                } else {
                  // Fetch user info
                  const userDoc = await getDoc(doc(db, 'users', participantId));
                  if (userDoc.exists()) {
                    const userData = userDoc.data();
                    chatData.participantNames[participantId] = userData.displayName || 'Unknown User';
                    chatData.participantPhotos[participantId] = userData.photoURL || '';
                  } else {
                    chatData.participantNames[participantId] = 'Unknown User';
                  }
                }
              }
              
              // Update the chat document with names
              await updateDoc(doc(db, 'chats', docChange.doc.id), {
                participantNames: chatData.participantNames,
                participantPhotos: chatData.participantPhotos
              });
            }
            
            // Handle different types of changes
            if (docChange.type === 'added' || docChange.type === 'modified') {
              chatsList.push(chatData);
            }
          }
          
          // Sort chats by most recent message
          chatsList.sort((a, b) => {
            if (!a.lastMessageTime && !b.lastMessageTime) return 0;
            if (!a.lastMessageTime) return 1;
            if (!b.lastMessageTime) return -1;
            return b.lastMessageTime.toMillis() - a.lastMessageTime.toMillis();
          });
          
          setChats(chatsList);
          setLoading(false);
        });
        
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching chats:', error);
        toast.error('Failed to load chats');
        setLoading(false);
      }
    };
    
    fetchChats();
  }, [currentUser]);

  // Load messages for selected chat
  useEffect(() => {
    if (selectedChat && currentUser) {
      setLoadingMessages(true);
      
      const messagesQuery = query(
        collection(db, `chats/${selectedChat.id}/messages`),
        orderBy('timestamp', 'asc')
      );
      
      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const messagesList: Message[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          messagesList.push({
            id: doc.id,
            text: data.text,
            senderId: data.senderId,
            senderName: data.senderId === currentUser.uid ? 'You' : 
                         (selectedChat.participantNames[data.senderId] || 'Unknown User'),
            timestamp: data.timestamp
          } as Message);
        });
        
        setMessages(messagesList);
        setLoadingMessages(false);
        
        // If there are unread messages for the current user, mark them as read
        if (selectedChat.unreadCounts && selectedChat.unreadCounts[currentUser.uid] > 0) {
          const unreadUpdate = { [`unreadCounts.${currentUser.uid}`]: 0 };
          updateDoc(doc(db, 'chats', selectedChat.id), unreadUpdate)
            .catch(error => console.error('Error updating read status:', error));
        }
      });
      
      return () => unsubscribe();
    }
  }, [selectedChat, currentUser]);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (message.trim() === '' || !selectedChat || !currentUser) return;

    try {
      // Add message to Firestore
      await addDoc(collection(db, `chats/${selectedChat.id}/messages`), {
        text: message,
        senderId: currentUser.uid,
        timestamp: serverTimestamp()
      });
      
      // Update the last message and timestamp in the chat document
      const otherUser = selectedChat.participants.find(id => id !== currentUser.uid);
      const unreadUpdate = otherUser ? { [`unreadCounts.${otherUser}`]: (selectedChat.unreadCounts?.[otherUser] || 0) + 1 } : {};
      
      await updateDoc(doc(db, 'chats', selectedChat.id), {
        lastMessage: message,
        lastMessageTime: serverTimestamp(),
        ...unreadUpdate
      });
      
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const startNewChat = async (userId: string) => {
    if (!currentUser) return;
    
    try {
      // Check if a chat already exists between these users
      const chatsQuery = query(
        collection(db, 'chats'),
        where('participants', 'array-contains', currentUser.uid)
      );
      
      const querySnapshot = await getDocs(chatsQuery);
      let existingChat: Chat | null = null;
      
      querySnapshot.forEach(doc => {
        const chatData = doc.data() as Chat;
        if (chatData.participants.includes(userId)) {
          existingChat = { ...chatData, id: doc.id };
        }
      });
      
      if (existingChat) {
        // Chat already exists, just select it
        setSelectedChat(existingChat);
      } else {
        // Create a new chat
        const targetUser = users.find(user => user.id === userId);
        if (!targetUser) {
          toast.error('User not found');
          return;
        }
        
        const chatData = {
          participants: [currentUser.uid, userId],
          participantNames: {
            [currentUser.uid]: currentUser.displayName || 'You',
            [userId]: targetUser.displayName
          },
          participantPhotos: {
            [currentUser.uid]: currentUser.photoURL || '',
            [userId]: targetUser.photoURL || ''
          },
          lastMessage: '',
          lastMessageTime: serverTimestamp(),
          unreadCounts: {
            [currentUser.uid]: 0,
            [userId]: 0
          }
        };
        
        const chatRef = await addDoc(collection(db, 'chats'), chatData);
        setSelectedChat({ ...chatData, id: chatRef.id } as Chat);
      }
      
      setNewChatDialogOpen(false);
    } catch (error) {
      console.error('Error creating chat:', error);
      toast.error('Failed to create chat');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: Timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate();
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === now.toDateString()) {
      return formatTime(timestamp);
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredChats = searchTerm 
    ? chats.filter(chat => {
        const otherParticipantId = chat.participants.find(p => p !== currentUser?.uid);
        const otherParticipantName = chat.participantNames[otherParticipantId || ''] || '';
        return otherParticipantName.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : chats;

  const filteredUsers = searchUserTerm
    ? users.filter(user => 
        user.displayName.toLowerCase().includes(searchUserTerm.toLowerCase()))
    : users;

  const getOtherParticipant = (chat: Chat) => {
    if (!currentUser) return null;
    const otherParticipantId = chat.participants.find(p => p !== currentUser.uid);
    return users.find(u => u.id === otherParticipantId);
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{t('common.messaging')}</h1>
        <p className="text-gray-500">{t('messaging.description')}</p>
      </div>

      <div className="flex gap-4 h-[calc(100vh-180px)]">
        {/* Contacts List */}
        <Card className="w-[350px] flex-shrink-0 flex flex-col overflow-hidden">
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder={t('messaging.searchChats')}
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">{t('messaging.recentChats')}</h2>
              <Dialog open={newChatDialogOpen} onOpenChange={setNewChatDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    {t('messaging.newChat')}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t('messaging.selectUser')}</DialogTitle>
                  </DialogHeader>
                  <div className="relative mb-4">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input 
                      placeholder={t('messaging.searchUsers')}
                      className="pl-10"
                      value={searchUserTerm}
                      onChange={(e) => setSearchUserTerm(e.target.value)}
                    />
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {filteredUsers.length === 0 ? (
                      <p className="text-center text-gray-500">{t('messaging.noUsers')}</p>
                    ) : (
                      <div className="space-y-2">
                        {filteredUsers.map((user) => (
                          <div 
                            key={user.id}
                            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100"
                            onClick={() => startNewChat(user.id)}
                          >
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.photoURL} />
                              <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium">{user.displayName}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <p>{t('common.loading')}...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Recent Chats Section */}
                <div className="space-y-1 px-2 mb-6">
                  {filteredChats.length === 0 ? (
                    <div className="text-center p-4 text-gray-500">
                      <p>{t('messaging.noChats')}</p>
                    </div>
                  ) : (
                    filteredChats.map((chat) => {
                      const otherParticipantId = chat.participants.find(p => p !== currentUser?.uid);
                      const unreadCount = chat.unreadCounts?.[currentUser?.uid || ''] || 0;
                      
                      return (
                        <div 
                          key={chat.id}
                          className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${
                            selectedChat?.id === chat.id ? 'bg-gray-100' : ''
                          }`}
                          onClick={() => setSelectedChat(chat)}
                        >
                          <div className="relative">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={chat.participantPhotos?.[otherParticipantId || ''] || ''} />
                              <AvatarFallback>{chat.participantNames[otherParticipantId || '']?.charAt(0) || '?'}</AvatarFallback>
                            </Avatar>
                            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                              getOtherParticipant(chat)?.online ? 'bg-green-500' : 'bg-gray-400'
                            }`}></span>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium truncate">
                                {chat.participantNames[otherParticipantId || ''] || 'Unknown'}
                              </h3>
                              <span className="text-xs text-gray-500">
                                {chat.lastMessageTime ? formatDate(chat.lastMessageTime) : ''}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 truncate">
                              {chat.lastMessage || 'Start a conversation'}
                            </p>
                          </div>
                          
                          {unreadCount > 0 && (
                            <Badge className="bg-blue-600">{unreadCount}</Badge>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
                
                {/* All Users Section */}
                <div className="px-2">
                  <h2 className="font-semibold text-sm text-gray-500 px-3 mb-2">{t('messaging.allUsers')}</h2>
                  {users.length === 0 ? (
                    <div className="text-center p-4 text-gray-500">
                      <p>{t('messaging.noUsers')}</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {users
                        // Filter out users that are already in existing chats
                        .filter(user => !filteredChats.some(chat => 
                          chat.participants.includes(user.id)
                        ))
                        .map((user) => (
                          <div 
                            key={user.id}
                            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => startNewChat(user.id)}
                          >
                            <div className="relative">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={user.photoURL} />
                                <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                                user.online ? 'bg-green-500' : 'bg-gray-400'
                              }`}></span>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium truncate">{user.displayName}</h3>
                              <p className="text-xs text-gray-500">{user.online ? 'Online' : 'Offline'}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col overflow-hidden">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 p-4 border-b">
                <Button variant="ghost" size="icon" className="md:hidden">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage 
                      src={selectedChat.participantPhotos?.[selectedChat.participants.find(p => p !== currentUser?.uid) || ''] || ''} 
                    />
                    <AvatarFallback>
                      {selectedChat.participantNames[selectedChat.participants.find(p => p !== currentUser?.uid) || '']?.charAt(0) || '?'}
                    </AvatarFallback>
                  </Avatar>
                  <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                    getOtherParticipant(selectedChat)?.online ? 'bg-green-500' : 'bg-gray-400'
                  }`}></span>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium">
                    {selectedChat.participantNames[selectedChat.participants.find(p => p !== currentUser?.uid) || ''] || 'Unknown'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {getOtherParticipant(selectedChat)?.online ? 'Online' : 'Offline'}
                  </p>
                </div>
                
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4">
                {loadingMessages ? (
                  <div className="flex items-center justify-center h-full">
                    <p>{t('common.loading')}...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">{t('messaging.noMessages')}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex ${msg.senderId === currentUser?.uid ? 'justify-end' : ''}`}
                      >
                        {msg.senderId !== currentUser?.uid && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            <AvatarImage 
                              src={selectedChat.participantPhotos?.[msg.senderId] || ''} 
                            />
                            <AvatarFallback>{msg.senderName.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div className={`max-w-[70%] ${msg.senderId === currentUser?.uid ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'} rounded-xl p-3`}>
                          <p className="break-words">{msg.text}</p>
                          <p className={`text-xs mt-1 ${msg.senderId === currentUser?.uid ? 'text-blue-100' : 'text-gray-500'}`}>
                            {msg.timestamp ? formatTime(msg.timestamp) : ''}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder={t('messaging.typeMessage')}
                    className="flex-1"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <User className="w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium mb-2">{t('messaging.noChat')}</h3>
              <p className="text-gray-500 mb-6">
                {t('messaging.selectChat')}
              </p>
              <Dialog open={newChatDialogOpen} onOpenChange={setNewChatDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <User className="w-4 h-4 mr-2" />
                    {t('messaging.startChat')}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t('messaging.selectUser')}</DialogTitle>
                  </DialogHeader>
                  <div className="relative mb-4">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input 
                      placeholder={t('messaging.searchUsers')}
                      className="pl-10"
                      value={searchUserTerm}
                      onChange={(e) => setSearchUserTerm(e.target.value)}
                    />
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {filteredUsers.length === 0 ? (
                      <p className="text-center text-gray-500">{t('messaging.noUsers')}</p>
                    ) : (
                      <div className="space-y-2">
                        {filteredUsers.map((user) => (
                          <div 
                            key={user.id}
                            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100"
                            onClick={() => startNewChat(user.id)}
                          >
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.photoURL} />
                              <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium">{user.displayName}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Messaging; 