import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Search,
  MoreHorizontal,
  Plus,
  Users,
  UserPlus,
  TrendingUp,
  Hash,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  avatar: string;
  handle: string;
  isFollowing?: boolean;
}

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    handle: string;
    timestamp: string;
  };
  content: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  hashtags?: string[];
}

const mockFavorites: User[] = [
  { id: '1', name: 'Jeff Michaal', avatar: '/placeholder.svg', handle: '@jeff_michaal' },
  { id: '2', name: 'Naomi', avatar: '/placeholder.svg', handle: '@naomi' },
  { id: '3', name: 'Anya Gerald', avatar: '/placeholder.svg', handle: '@anya_gerald' },
  { id: '4', name: '3D Blender', avatar: '/placeholder.svg', handle: '@3d_blender' }
];

const mockCommunity: User[] = [
  { id: '5', name: '3D Blender', avatar: '/placeholder.svg', handle: '@3d_blender' },
  { id: '6', name: 'Logo Designer', avatar: '/placeholder.svg', handle: '@logo_designer' },
  { id: '7', name: 'Brand Designer', avatar: '/placeholder.svg', handle: '@brand_designer' },
  { id: '8', name: 'Photography', avatar: '/placeholder.svg', handle: '@photography' }
];

const mockFollowing: User[] = [
  { id: '9', name: 'Jeff Michaal', avatar: '/placeholder.svg', handle: '@jeff_michaal' },
  { id: '10', name: 'Naomi', avatar: '/placeholder.svg', handle: '@naomi' },
  { id: '11', name: 'Anya Gerald', avatar: '/placeholder.svg', handle: '@anya_gerald' },
  { id: '12', name: 'M. Benar', avatar: '/placeholder.svg', handle: '@m_benar' },
  { id: '13', name: 'Willy Wingku', avatar: '/placeholder.svg', handle: '@willy_wingku' }
];

const mockRecommendations: User[] = [
  { id: '14', name: 'Imari Usmani', avatar: '/placeholder.svg', handle: '@imari_usmani', isFollowing: false },
  { id: '15', name: 'Mado Mane', avatar: '/placeholder.svg', handle: '@mado_mane', isFollowing: false },
  { id: '16', name: 'Javier Ariffin', avatar: '/placeholder.svg', handle: '@javier_ariffin', isFollowing: false },
  { id: '17', name: 'Ismail bin Mail', avatar: '/placeholder.svg', handle: '@ismail_mail', isFollowing: false }
];

const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Naomi Yashida',
      avatar: '/placeholder.svg',
      handle: '@naomi_yashida',
      timestamp: '2 mins ago'
    },
    content: 'More effort is wasted doing things that don\'t matter than is wasted doing things inefficiently. And if that is the case, elimination is a more useful skill than optimization. I am reminded of the famous Peter Drucker quote, "There is nothing so useless as doing efficiently that which should not be done at all."',
    likes: 4124,
    comments: 31,
    shares: 0,
    isLiked: false,
    hashtags: ['Tips', 'ProductivityHacks', 'SelfDev']
  },
  {
    id: '2',
    author: {
      name: 'Mohammed Benar',
      avatar: '/placeholder.svg',
      handle: '@mohammed_benar',
      timestamp: '1 hour ago'
    },
    content: 'Beautiful landscape photography from my recent trip. The colors of nature never cease to amaze me.',
    likes: 892,
    comments: 45,
    shares: 12,
    isLiked: true,
    hashtags: ['Photography', 'Nature', 'Landscape']
  }
];

const topicTags = ['Design', 'User Experience', 'UI', 'Photography', 'Viral', 'Illustration', 'Print Design', 'Productivity'];

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPost, setNewPost] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  const handleFollow = (userId: string) => {
    toast({
      title: "Following user",
      description: "You are now following this user.",
    });
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      author: {
        name: 'You',
        avatar: '/placeholder.svg',
        handle: '@you',
        timestamp: 'Just now'
      },
      content: newPost,
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false
    };

    setPosts([post, ...posts]);
    setNewPost('');
    toast({
      title: "Post created!",
      description: "Your post has been shared with the community.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex w-full">
        {/* Left Sidebar */}
        <div className="w-64 p-6 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search post and comments"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl border-gray-200"
              />
            </div>
          </div>

          {/* Favourites */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">FAVOURITES</h3>
            <div className="space-y-3">
              {mockFavorites.map((user) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  <Heart className="w-4 h-4 text-blue-500 ml-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* Community */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">COMMUNITY</h3>
            <div className="space-y-3">
              {mockCommunity.map((user) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  <Heart className="w-4 h-4 text-blue-500 ml-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* Following */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">FOLLOWING</h3>
            <div className="space-y-3">
              {mockFollowing.map((user) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  <Heart className="w-4 h-4 text-blue-500 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Feed */}
        <div className="flex-1 p-6">
          {/* Create Post */}
          <Card className="mb-6 rounded-3xl border-gray-200">
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>YU</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Write your comment..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[80px] resize-none border-0 shadow-none focus-visible:ring-0 text-lg placeholder:text-gray-400"
                  />
                  <div className="flex justify-end mt-4">
                    <Button 
                      onClick={handleCreatePost} 
                      disabled={!newPost.trim()}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6"
                    >
                      Create Post
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="rounded-3xl border-gray-200">
                <CardContent className="p-6">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                          <span className="text-sm text-gray-500">{post.author.handle}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{post.author.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="rounded-full">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-gray-900 leading-relaxed mb-4">{post.content}</p>
                    
                    {post.hashtags && (
                      <div className="flex flex-wrap gap-2">
                        {post.hashtags.map((hashtag) => (
                          <span key={hashtag} className="text-blue-600 hover:text-blue-700 cursor-pointer">
                            #{hashtag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between py-3 border-t border-gray-100">
                    <div className="flex items-center space-x-6">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
                      >
                        <Heart 
                          className={`w-5 h-5 ${post.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
                        />
                        <span className={`text-sm font-medium ${post.isLiked ? 'text-red-500' : 'text-gray-700'}`}>
                          {post.likes.toLocaleString()}
                        </span>
                      </button>
                      
                      <button className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors">
                        <MessageCircle className="w-5 h-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">{post.comments}</span>
                      </button>
                      
                      <button className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors">
                        <Share2 className="w-5 h-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">{post.shares}</span>
                      </button>
                    </div>
                  </div>

                  {/* Comments Preview */}
                  <div className="mt-4 space-y-3">
                    <div className="flex space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>IM</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">Ismail bin Mail</span>
                          <span className="text-sm text-gray-500">21 mins</span>
                        </div>
                        <p className="text-sm text-gray-700">I am reminded of the famous Peter Drucker quote, "There is nothing so useless as doing efficiently that which should not be done at all."</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <button className="text-xs text-gray-500 hover:text-gray-700">Reply</button>
                          <Heart className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">12</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>Y</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">You</span>
                          <span className="text-sm text-gray-500">Just now</span>
                        </div>
                        <p className="text-sm text-gray-700">Love it bro!</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <button className="text-xs text-gray-500 hover:text-gray-700">Reply</button>
                          <Heart className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">0</span>
                        </div>
                      </div>
                    </div>

                    <button className="text-blue-600 text-sm hover:text-blue-700 font-medium">
                      View All Comments
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 p-6 bg-white border-l border-gray-200 h-screen sticky top-0 overflow-y-auto">
          {/* Profile Summary */}
          <Card className="mb-6 rounded-3xl border-gray-200">
            <CardContent className="p-6 text-center">
              <div className="relative mb-4">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div className="absolute top-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Salahudin Jafar</h3>
              <p className="text-sm text-gray-500 mb-4">@salahudin</p>
              <div className="text-sm text-blue-600 mb-4">👑 You had 20% visitors this week</div>
              
              <div className="flex justify-center space-x-8 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">201</div>
                  <div className="text-xs text-gray-500">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">11.2K</div>
                  <div className="text-xs text-gray-500">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">501</div>
                  <div className="text-xs text-gray-500">Following</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">RECOMMENDATION</h3>
            <div className="space-y-4">
              {mockRecommendations.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{user.name}</div>
                      <div className="text-xs text-gray-500">12 minutes</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleFollow(user.id)}
                    className="rounded-full px-4 text-xs"
                  >
                    Follow
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Topics You Follow */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">TOPICS YOU FOLLOW</h3>
              <Button variant="ghost" size="sm" className="text-blue-600">
                <Hash className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {topicTags.map((topic) => (
                <Badge key={topic} variant="secondary" className="rounded-full text-xs px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200">
                  {topic}
                  <X className="w-3 h-3 ml-1 cursor-pointer" />
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;