import React, { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, MoreHorizontal, Phone, Video, Info, Smile, Paperclip, Mic, Send, Users } from "lucide-react"
import { useAuthContext } from '@/lib/AuthProvider';
import { 
  getAllUsers, 
  getOrCreateChat, 
  getUserChats, 
  sendMessage, 
  subscribeToMessages, 
  subscribeToUserChats,
  markChatAsRead,
  getOtherParticipant,
  formatRelativeTime,
  type Chat,
  type ChatMessage
} from '@/lib/chats';
import { type UserProfile } from '@/lib/users';
import { toast } from 'sonner';

export default function MyChats() {
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState<'chats' | 'users'>('chats');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const unsubscribeMessages = useRef<(() => void) | null>(null);
  const unsubscribeChats = useRef<(() => void) | null>(null);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        console.log('Fetching users...');
        const allUsers = await getAllUsers();
        console.log('Users fetched:', allUsers);
        setUsers(allUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error(`Failed to load users: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      console.log('User authenticated, fetching users...');
      fetchUsers();
    } else {
      console.log('No user authenticated');
    }
  }, [user]);

  // Subscribe to user chats
  useEffect(() => {
    if (!user) {
      console.log('No user, skipping chat subscription');
      return;
    }

    console.log('Setting up chat subscription for user:', user.uid);
    unsubscribeChats.current = subscribeToUserChats((updatedChats) => {
      console.log('Chats updated:', updatedChats);
      setChats(updatedChats);
    });

    return () => {
      if (unsubscribeChats.current) {
        console.log('Cleaning up chat subscription');
        unsubscribeChats.current();
      }
    };
  }, [user]);

  // Subscribe to messages when chat is selected
  useEffect(() => {
    if (unsubscribeMessages.current) {
      console.log('Cleaning up previous message subscription');
      unsubscribeMessages.current();
    }

    if (selectedChat) {
      console.log('Setting up message subscription for chat:', selectedChat.id);
      unsubscribeMessages.current = subscribeToMessages(selectedChat.id, (updatedMessages) => {
        console.log('Messages updated:', updatedMessages);
        setMessages(updatedMessages);
        // Mark chat as read
        markChatAsRead(selectedChat.id);
      });
    } else {
      console.log('No chat selected, skipping message subscription');
    }

    return () => {
      if (unsubscribeMessages.current) {
        console.log('Cleaning up message subscription');
        unsubscribeMessages.current();
      }
    };
  }, [selectedChat]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Filter chats and users based on search
  const filteredChats = chats.filter(chat => {
    const otherParticipantId = getOtherParticipant(chat);
    if (!otherParticipantId) return false;
    
    const otherParticipantName = chat.participantNames[otherParticipantId] || '';
    return otherParticipantName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredUsers = users.filter(user => 
    user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle user selection
  const handleUserSelect = async (selectedUser: UserProfile) => {
    try {
      setIsLoading(true);
      console.log('Starting chat with user:', selectedUser);
      const chat = await getOrCreateChat(selectedUser.id);
      if (chat) {
        console.log('Chat created/found:', chat);
        setSelectedChat(chat);
        setSelectedUser(selectedUser);
        setActiveTab('chats');
        toast.success(`Started chat with ${selectedUser.displayName}`);
      } else {
        toast.error('Failed to create chat');
      }
    } catch (error) {
      console.error('Error creating chat:', error);
      toast.error(`Failed to start chat: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle chat selection
  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    const otherParticipantId = getOtherParticipant(chat);
    if (otherParticipantId) {
      const otherUser = users.find(u => u.id === otherParticipantId);
      setSelectedUser(otherUser || null);
    }
  };

  // Handle sending message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || isSending) return;

    setIsSending(true);
    try {
      console.log('Sending message:', newMessage.trim(), 'to chat:', selectedChat.id);
      const success = await sendMessage(selectedChat.id, newMessage.trim());
      if (success) {
        setNewMessage('');
        console.log('Message sent successfully');
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(`Failed to send message: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSending(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get current chat user info
  const getCurrentChatUser = () => {
    if (!selectedChat) return null;
    const otherParticipantId = getOtherParticipant(selectedChat);
    if (!otherParticipantId) return null;
    
    return {
      id: otherParticipantId,
      name: selectedChat.participantNames[otherParticipantId] || 'Unknown',
      photoURL: selectedChat.participantPhotos[otherParticipantId] || '/placeholder.svg'
    };
  };

  const currentChatUser = getCurrentChatUser();

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">Please log in to access chats</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">Chats</h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search messages..." 
              className="pl-10 bg-gray-100 border-0 focus-visible:ring-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tab Buttons */}
          <div className="flex gap-2 mt-4">
            <Button
              variant={activeTab === 'chats' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('chats')}
              className="flex-1"
            >
              My Chats
            </Button>
            <Button
              variant={activeTab === 'users' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('users')}
              className="flex-1"
            >
              All Users
            </Button>
          </div>
        </div>

        {/* Contacts/Users List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            ) : activeTab === 'chats' ? (
              // Chats List
              filteredChats.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p>No chats yet</p>
                  <p className="text-sm">Start a conversation with someone!</p>
                </div>
              ) : (
                filteredChats.map((chat) => {
                  const otherParticipantId = getOtherParticipant(chat);
                  const otherParticipantName = otherParticipantId ? chat.participantNames[otherParticipantId] : 'Unknown';
                  const otherParticipantPhoto = otherParticipantId ? chat.participantPhotos[otherParticipantId] : '/placeholder.svg';
                  const isSelected = selectedChat?.id === chat.id;
                  const unreadCount = chat.unreadCount[user.uid] || 0;

                  return (
                    <div
                      key={chat.id}
                      className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${
                        isSelected ? "bg-blue-500 text-white hover:bg-blue-600" : ""
                      }`}
                      onClick={() => handleChatSelect(chat)}
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={otherParticipantPhoto} alt={otherParticipantName} />
                          <AvatarFallback>{otherParticipantName.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-medium truncate ${isSelected ? "text-white" : "text-gray-900"}`}>
                            {otherParticipantName}
                          </h3>
                          {chat.lastMessageTime && (
                            <span className={`text-xs ${isSelected ? "text-blue-100" : "text-gray-500"}`}>
                              {formatRelativeTime(chat.lastMessageTime)}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm truncate ${isSelected ? "text-blue-100" : "text-gray-600"}`}>
                          {chat.lastMessage || 'No messages yet'}
                        </p>
                      </div>

                      {unreadCount > 0 && (
                        <div className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {unreadCount}
                        </div>
                      )}
                    </div>
                  );
                })
              )
            ) : (
              // Users List
              filteredUsers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No users found</p>
                </div>
              ) : (
                filteredUsers.map((userProfile) => (
                  <div
                    key={userProfile.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                    onClick={() => handleUserSelect(userProfile)}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={userProfile.photoURL} alt={userProfile.displayName} />
                      <AvatarFallback>{userProfile.displayName.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate text-gray-900">
                        {userProfile.displayName}
                      </h3>
                      <p className="text-sm truncate text-gray-600">
                        Click to start chat
                      </p>
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat && currentChatUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={currentChatUser.photoURL} alt={currentChatUser.name} />
                    <AvatarFallback>{currentChatUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold text-gray-900">{currentChatUser.name}</h2>
                    <p className="text-sm text-green-600">Online</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No messages yet</p>
                    <p className="text-sm">Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((message) => {
                    const isOwnMessage = message.senderId === user.uid;
                    
                    return (
                      <div
                        key={message.id}
                        className={`flex gap-2 ${isOwnMessage ? "justify-end" : "justify-start"}`}
                      >
                        {!isOwnMessage && (
                          <Avatar className="h-8 w-8 mt-1">
                            <AvatarImage src={message.senderPhotoURL} alt="Avatar" />
                            <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}

                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            isOwnMessage
                              ? "bg-blue-500 text-white rounded-br-md"
                              : "bg-gray-200 text-gray-900 rounded-bl-md"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500">
                  <Paperclip className="h-4 w-4" />
                </Button>

                <div className="flex-1 relative">
                  <Input 
                    placeholder="Message" 
                    className="pr-20 bg-gray-100 border-0 focus-visible:ring-1"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isSending}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-500">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-500">
                      <Mic className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button 
                  size="icon" 
                  className="h-9 w-9 bg-blue-500 hover:bg-blue-600"
                  onClick={handleSendMessage}
                  disabled={isSending || !newMessage.trim()}
                >
                  {isSending ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </>
        ) : (
          /* No Chat Selected */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No chat selected</h3>
              <p className="text-gray-500 mb-4">
                Choose a chat from the list or start a new conversation
              </p>
              <Button 
                onClick={() => setActiveTab('users')}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Start New Chat
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 