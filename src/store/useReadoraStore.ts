import { create } from "zustand";

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  coverColor: string;
  minutesToRead: number;
  xpValue: number;
  content: string[];
  quotePrompt: string;
}

export interface Reflection {
  id: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  quote: string;
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userName: string;
  userAvatar: string;
  userRank: string;
  bookTitle: string;
  bookAuthor: string;
  quote: string;
  reflection: string;
  likes: number;
  liked: boolean;
  shares: number;
  commentsCount: number;
  timestamp: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  title: string;
  isSelf?: boolean;
}

export interface Notification {
  id: string;
  type: "like" | "comment" | "streak" | "rank";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

interface ReadoraStore {
  // User profile
  userName: string;
  userRank: "Reader" | "Thinker" | "Scholar" | "Sage" | "Legend";
  userXp: number;
  userLevel: number;
  userStreak: number;
  streakActive: boolean;
  dailyGoalMins: number;
  readMinsToday: number;
  completedToday: boolean;
  userAvatar: string;
  userBio: string;
  userBadges: { id: string; name: string; desc: string; icon: string; date: string }[];
  userFollowers: number;
  userFollowing: number;

  // Book database
  books: Book[];
  activeBookId: string | null;
  savedQuotes: { bookTitle: string; author: string; text: string; date: string }[];
  reflections: Reflection[];

  // Feed posts
  posts: Post[];

  // Leaderboard
  leaderboard: LeaderboardUser[];

  // Notifications
  notifications: Notification[];

  // Settings & preferences
  fontSize: "sm" | "base" | "lg" | "xl";
  readingBackground: "cream" | "sepia" | "obsidian";
  zenMusic: boolean;
  isAuthenticated: boolean;
  authToken: string | null;
  currentScreen: string; // Navigator string to switch views in mockup mode

  // Actions
  login: (token: string) => void;
  logout: () => void;
  addXp: (amount: number) => void;
  incrementReadTime: (mins: number) => void;
  completeDailyGoal: () => void;
  addReflection: (bookId: string, quote: string, text: string) => void;
  likePost: (postId: string) => void;
  saveQuote: (bookTitle: string, author: string, text: string) => void;
  setActiveBook: (id: string | null) => void;
  readNotification: (id: string) => void;
  setFontSize: (size: "sm" | "base" | "lg" | "xl") => void;
  setReadingBackground: (bg: "cream" | "sepia" | "obsidian") => void;
  setZenMusic: (active: boolean) => void;
  setScreen: (screenName: string) => void;
  resetProgress: () => void;
}

const mockBooks: Book[] = [
  {
    id: "1",
    title: "Meditations",
    author: "Marcus Aurelius",
    category: "Philosophy",
    coverColor: "from-[#7C2D12] to-[#6B4F3A]",
    minutesToRead: 10,
    xpValue: 150,
    content: [
      "The soul becomes dyed with the color of its thoughts. Value then, only what is right, and let your mind dwell on things that are wholesome, pure, and true.",
      "Look within. Within is the fountain of good, and it will ever bubble up, if you wilt ever dig. Do not waste the remainder of your life in thoughts about others, unless it refers to some common utility.",
      "For you will never have time to complete your duty if you are constantly distracted. Every hour focus like a Roman, with thorough and unaffected dignity, with affection, freedom, and justice.",
      "The happiness of your life depends upon the quality of your thoughts: therefore, guard accordingly, and take care that you entertain no notions unsuitable to virtue and reasonable nature."
    ],
    quotePrompt: "Select a quote that challenges your modern conception of productivity."
  },
  {
    id: "2",
    title: "The Letters of Vincent van Gogh",
    author: "Vincent van Gogh",
    category: "Art & Soul",
    coverColor: "from-[#D97706] to-[#8B7355]",
    minutesToRead: 12,
    xpValue: 180,
    content: [
      "I want to touch people with my art. I want them to say of my work: 'he feels deeply, he feels tenderly.' Even if I am considered a nobody, or a misfit in society, I must speak through my creations.",
      "There is a great fire in our souls, yet no one ever comes to warm themselves at it, and the passers-by see only a wisp of smoke coming out of the chimney and go on their way.",
      "What is drawing? How does one get there? It is working through an invisible iron wall that seems to stand between what one feels and what one can do.",
      "It is good to love many things, for therein lies the true strength, and whosoever loves much performs much, and can accomplish much, and what is done in love is well done."
    ],
    quotePrompt: "What is your 'great fire' that others only see as a wisp of smoke?"
  },
  {
    id: "3",
    title: "The Book of Tea",
    author: "Kakuzo Okakura",
    category: "Aesthetics",
    coverColor: "from-[#6B4F3A] to-[#202020]",
    minutesToRead: 8,
    xpValue: 120,
    content: [
      "Teaism is a cult founded on the adoration of the beautiful among the sordid facts of everyday existence. It instills purity and harmony, the mystery of mutual charity, the romanticism of the social order.",
      "It is essentially a worship of the Imperfect, as it is a tender attempt to accomplish something possible in this impossible thing we know as life.",
      "The heaven of modern humanity is indeed shattered in the struggle for wealth. We have created a monster that devours our leisure, and we call it efficiency.",
      "Let us remain in the tea-room, where the tea-master pours quietness from a ceramic jar. Let us dream of fleeting beauty, and linger in the beautiful foolishness of things."
    ],
    quotePrompt: "Select a passage that highlights the elegance of slower living."
  },
  {
    id: "4",
    title: "Beyond Good and Evil",
    author: "Friedrich Nietzsche",
    category: "Philosophy",
    coverColor: "from-[#252525] to-[#7C2D12]",
    minutesToRead: 15,
    xpValue: 220,
    content: [
      "He who fights with monsters should look to it that he himself does not become a monster. And if you gaze long into an abyss, the abyss also gazes into you.",
      "You must have chaos within you to give birth to a dancing star. The noble soul has reverence for itself, refusing to seek validation in the market-place of opinions.",
      "Indeed, what is done out of love always takes place beyond good and evil. It is the prejudice of the intellectual to believe that logic dictates all human greatness.",
      "There are no phenomena, only interpretations. In our quest for absolute certainty, we have sterilized the mystery of existence, choosing sterile safety over dangerous depths."
    ],
    quotePrompt: "Pick a statement that shifts your view of personal chaos."
  }
];

const mockPosts: Post[] = [
  {
    id: "p1",
    userName: "Clara Kim",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
    userRank: "Sage",
    bookTitle: "The Book of Tea",
    bookAuthor: "Kakuzo Okakura",
    quote: "Teaism is a worship of the Imperfect, as it is a tender attempt to accomplish something possible in this impossible thing we know as life.",
    reflection: "We are so obsessed with optimization and checking off checklists. Okakura's words remind me that reading shouldn't be about 'finishing 100 books a year'—it should be a slow, loving embrace of the imperfect process. Finding peace in the warm steam of a quiet page.",
    likes: 42,
    liked: false,
    shares: 8,
    commentsCount: 14,
    timestamp: "2 hours ago"
  },
  {
    id: "p2",
    userName: "Marcus Sterling",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop",
    userRank: "Thinker",
    bookTitle: "Meditations",
    bookAuthor: "Marcus Aurelius",
    quote: "The soul becomes dyed with the color of its thoughts. Value then, only what is right.",
    reflection: "In the age of infinite scrolling, our minds are constantly dyed in the noisy, chaotic colors of social algorithms. Spending just 10 quiet minutes with Aurelius in the morning feels like a deep mental detox. Highly recommend setting an aesthetic desktop space for reading.",
    likes: 29,
    liked: true,
    shares: 3,
    commentsCount: 6,
    timestamp: "5 hours ago"
  },
  {
    id: "p3",
    userName: "Sophia Chen",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
    userRank: "Reader",
    bookTitle: "The Letters of Vincent van Gogh",
    bookAuthor: "Vincent van Gogh",
    quote: "There is a great fire in our souls, yet no one ever comes to warm themselves at it...",
    reflection: "Van Gogh felt so misunderstood, yet his letters carry a staggering warmth. This quote breaks my heart every time I read it. We all have that inner passion, that glowing fireplace, and we spend our lives hoping someone will stop and notice more than just a wisp of smoke.",
    likes: 56,
    liked: false,
    shares: 12,
    commentsCount: 19,
    timestamp: "1 day ago"
  }
];

export const useReadoraStore = create<ReadoraStore>((set, get) => ({
  // Initial user state
  userName: "Julian Vane",
  userRank: "Scholar",
  userXp: 2450,
  userLevel: 3,
  userStreak: 12,
  streakActive: true,
  dailyGoalMins: 15,
  readMinsToday: 6, // 6 minutes read already today
  completedToday: false,
  userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&auto=format&fit=crop",
  userBio: "Curating timeless insights at the intersection of classical philosophy, modern visual aesthetics, and micro-habits. Daily coffee drinker.",
  userBadges: [
    { id: "b1", name: "First Light", desc: "Read before 7:00 AM", icon: "🌅", date: "May 10, 2026" },
    { id: "b2", name: "Stoic Mind", desc: "Complete Meditations Chapter 1", icon: "🏛️", date: "May 14, 2026" },
    { id: "b3", name: "Constant Flame", desc: "Achieve a 10-day reading streak", icon: "🔥", date: "May 19, 2026" }
  ],
  userFollowers: 142,
  userFollowing: 89,

  // Lists
  books: mockBooks,
  activeBookId: null,
  savedQuotes: [
    {
      bookTitle: "Meditations",
      author: "Marcus Aurelius",
      text: "Every hour focus like a Roman, with thorough and unaffected dignity, with affection, freedom, and justice.",
      date: "May 15, 2026"
    },
    {
      bookTitle: "The Letters of Vincent van Gogh",
      author: "Vincent van Gogh",
      text: "What is done in love is well done.",
      date: "May 18, 2026"
    }
  ],
  reflections: [
    {
      id: "r1",
      bookId: "1",
      bookTitle: "Meditations",
      bookAuthor: "Marcus Aurelius",
      quote: "The soul becomes dyed with the color of its thoughts.",
      text: "This drives home the idea that environment and visual inputs completely frame our psychology. A dark, quiet room with warm lights changes the entire flavor of my focus.",
      createdAt: "May 20, 2026"
    }
  ],

  posts: mockPosts,

  leaderboard: [
    { rank: 1, name: "Clara Kim", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop", xp: 3200, level: 4, streak: 21, title: "Sage" },
    { rank: 2, name: "Julian Vane", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&auto=format&fit=crop", xp: 2450, level: 3, streak: 12, title: "Scholar", isSelf: true },
    { rank: 3, name: "Marcus Sterling", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop", xp: 1980, level: 2, streak: 8, title: "Thinker" },
    { rank: 4, name: "Sophia Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop", xp: 1420, level: 2, streak: 5, title: "Reader" },
    { rank: 5, name: "Arthur Pendelton", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop", xp: 950, level: 1, streak: 2, title: "Reader" }
  ],

  notifications: [
    { id: "n1", type: "like", title: "Appreciation Received", description: "Clara Kim and 12 others liked your reflection on Meditations.", timestamp: "1 hour ago", read: false },
    { id: "n2", type: "comment", title: "New Conversation", description: "Marcus Sterling replied: 'Exactly! Aurelius holds the mirror up to us...'", timestamp: "3 hours ago", read: false },
    { id: "n3", type: "streak", title: "Flame Protected", description: "Your daily streak was automatically secured. Keep the warmth alive!", timestamp: "1 day ago", read: true }
  ],

  // Preferences
  fontSize: "base",
  readingBackground: "obsidian",
  zenMusic: false,
  isAuthenticated: false,
  authToken: null,
  currentScreen: "landing", // Starting screen on loading

  // Actions
  login: (token) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("readora_auth_token", token);
    }
    set({ isAuthenticated: true, authToken: token, currentScreen: "home" });
  },
  logout: () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("readora_auth_token");
    }
    set({ isAuthenticated: false, authToken: null, currentScreen: "landing" });
  },

  addXp: (amount) => {
    set((state) => {
      const newXp = state.userXp + amount;
      const nextLevelThreshold = state.userLevel * 1000;
      let newLevel = state.userLevel;
      let newRank = state.userRank;

      if (newXp >= nextLevelThreshold) {
        newLevel += 1;
        // Level based ranks
        if (newLevel >= 5) newRank = "Legend";
        else if (newLevel === 4) newRank = "Sage";
        else if (newLevel === 3) newRank = "Scholar";
        else if (newLevel === 2) newRank = "Thinker";

        // Add a notification celebrating Level Up!
        state.notifications.unshift({
          id: `rank-${Date.now()}`,
          type: "rank",
          title: "Level Ascended!",
          description: `You have reached Level ${newLevel} and earned the rank of ${newRank}.`,
          timestamp: "Just now",
          read: false
        });
      }

      // Update leaderboard list dynamically
      const updatedLeaderboard = state.leaderboard.map((u) => {
        if (u.isSelf) {
          return { ...u, xp: newXp, level: newLevel, title: newRank };
        }
        return u;
      }).sort((a, b) => b.xp - a.xp);

      // Re-assign ranks in leaderboard
      updatedLeaderboard.forEach((user, index) => {
        user.rank = index + 1;
      });

      return {
        userXp: newXp,
        userLevel: newLevel,
        userRank: newRank,
        leaderboard: updatedLeaderboard
      };
    });
  },

  incrementReadTime: (mins) => {
    set((state) => {
      const newMins = state.readMinsToday + mins;
      const alreadyCompleted = state.completedToday;
      const reachedGoal = newMins >= state.dailyGoalMins;

      // Celebrate daily reading goal
      if (reachedGoal && !alreadyCompleted) {
        setTimeout(() => {
          get().completeDailyGoal();
        }, 100);
      }

      return { readMinsToday: newMins };
    });
  },

  completeDailyGoal: () => {
    set((state) => {
      if (state.completedToday) return {};

      // If completing first time today
      const newStreak = state.userStreak + 1;
      
      // Update leaderboard
      const updatedLeaderboard = state.leaderboard.map((u) => {
        if (u.isSelf) {
          return { ...u, streak: newStreak };
        }
        return u;
      });

      // Add XP for completing daily goal
      setTimeout(() => {
        get().addXp(100); // 100 XP Daily goal completion
      }, 50);

      return {
        completedToday: true,
        userStreak: newStreak,
        streakActive: true,
        leaderboard: updatedLeaderboard
      };
    });
  },

  addReflection: (bookId, quote, text) => {
    set((state) => {
      const book = state.books.find((b) => b.id === bookId);
      if (!book) return {};

      const newRef: Reflection = {
        id: `ref-${Date.now()}`,
        bookId,
        bookTitle: book.title,
        bookAuthor: book.author,
        quote,
        text,
        createdAt: "Just now"
      };

      // Add to user posts feed too
      const newPost: Post = {
        id: `post-${Date.now()}`,
        userName: state.userName,
        userAvatar: state.userAvatar,
        userRank: state.userRank,
        bookTitle: book.title,
        bookAuthor: book.author,
        quote,
        reflection: text,
        likes: 0,
        liked: false,
        shares: 0,
        commentsCount: 0,
        timestamp: "Just now"
      };

      // Award XP for reflection writing (50 XP)
      setTimeout(() => {
        get().addXp(50);
      }, 50);

      return {
        reflections: [newRef, ...state.reflections],
        posts: [newPost, ...state.posts]
      };
    });
  },

  likePost: (postId) => {
    set((state) => {
      const updatedPosts = state.posts.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.liked;
          return {
            ...post,
            liked: isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      });
      return { posts: updatedPosts };
    });
  },

  saveQuote: (bookTitle, author, text) => {
    set((state) => {
      // Check if already saved to avoid duplicates
      const exists = state.savedQuotes.some((q) => q.text === text);
      if (exists) return {};

      const newQuote = {
        bookTitle,
        author,
        text,
        date: "Just now"
      };

      // Award 10 XP for curation
      setTimeout(() => {
        get().addXp(15);
      }, 50);

      return {
        savedQuotes: [newQuote, ...state.savedQuotes]
      };
    });
  },

  setActiveBook: (id) => set({ activeBookId: id }),
  
  readNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    }));
  },

  setFontSize: (size) => set({ fontSize: size }),
  setReadingBackground: (bg) => set({ readingBackground: bg }),
  setZenMusic: (active) => set({ zenMusic: active }),
  setScreen: (screenName) => set({ currentScreen: screenName }),

  resetProgress: () => set({
    readMinsToday: 0,
    completedToday: false,
    userStreak: 12,
    userXp: 2450,
    userLevel: 3,
    userRank: "Scholar"
  })
}));
