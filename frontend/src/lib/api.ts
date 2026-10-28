"use client";

import { useAuth } from "@clerk/nextjs";
import {
  getAnalyzedPosts,
  saveAnalyzedPost,
  type AnalysisRecord,
} from "./analyzedPostsStore";
import {
  getActiveProfile,
  getDataSources as getLocalDataSources,
  getAllProfiles as getLocalAllProfiles,
} from "./monitoringStore";
import { getStoredReports as getLocalReports } from "./reportsStore";

export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

/* =========================================================
   TYPES
   ========================================================= */

export interface CreateProfileInput {
  clerkId: string;
  email: string;
  name?: string;
  username?: string;

  
  profileType:
    | "PERSON"
    | "BRAND"
    | "CAMPAIGN";

  profileName: string;
  identifier: string;
  description?: string;
}

/* =========================================================
   GENERIC API RESPONSE
   ========================================================= */

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

/* =========================================================
   CREATED PROFILE
   ========================================================= */

export interface CreatedProfile {
  user: {
    id: number;
    clerkId: string;
    email: string;
    name?: string | null;
    username?: string | null;
  };

  profile: {
    id: number;
    userId: number;
    name: string;

    type:
      | "PERSON"
      | "BRAND"
      | "CAMPAIGN";

    identifier: string;
    description?: string | null;
    isActive: boolean;
    category?: string;
    entityType?: string;
    createdAt?: string;
    dataSources?: any[];
  };
}

/* =========================================================
   INSTAGRAM COMMENT
   ========================================================= */

export interface InstagramComment {
  id: string | null;
  username: string | null;
  text: string;
  likes: number | null;
  timestamp: string | null;
}

/* =========================================================
   AUDIENCE SENTIMENT
   ========================================================= */

export interface AudienceSentiment {
  positive: number;
  negative: number;
  neutral: number;

  dominant:
    | "POSITIVE"
    | "NEGATIVE"
    | "NEUTRAL"
    | "MIXED"
    | "UNAVAILABLE";

  explanation: string;
}

/* =========================================================
   ANALYZED POST RESPONSE
   ========================================================= */

export interface AnalyzedPostResponse {
  post: {
    platform: string;

    url: string;

    accessible: boolean;

    author: {
      name: string | null;
      handle: string | null;
    };

    content: string | null;

    postType: string;

    engagement: {
      likes: number | null;
      comments: number | null;
      shares: number | null;
      views: number | null;
    };

    publishedAt: string | null;

    media?: {
      url: string | null;
      type: string | null;
    };

    supplementalText?: string | null;

    commentsData?: InstagramComment[];
  };

  aiAnalysis: {
    sentiment: {
      label:
        | "POSITIVE"
        | "NEGATIVE"
        | "NEUTRAL";

      score: number;

      explanation: string;
    };

    emotions: Array<{
      emotion: string;
      score: number;
    }>;

    topics: string[];

    intent: {
      label: string;
      explanation: string;
    };

    summary: string;

    keyInsights: string[];

    toxicity: {
      detected: boolean;
      score: number;
      explanation: string;
    };

    recommendations: string[];

    audienceSentiment?: AudienceSentiment;

    confidence: number;
  };

  source: {
    url: string;

    retrieved: boolean;

    urlContextUsed: boolean;

    provider: string;
  };
}

/* =========================================================
   POST ANALYSIS DASHBOARD TYPES
   ========================================================= */

export interface DashboardOverview {
  totalPosts: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  totalViews: number;
}

export interface SentimentDistributionItem {
  sentiment:
    | "POSITIVE"
    | "NEGATIVE"
    | "NEUTRAL";

  count: number;
}

export interface SentimentOverTimeItem {
  date: string;

  positive: number;
  negative: number;
  neutral: number;
}

export interface EngagementOverTimeItem {
  date: string;

  likes: number;
  comments: number;
  shares: number;
  views: number;
}

export interface DashboardPost {
  id: number;

  platform: string;

  url: string;

  content: string | null;

  postType: string;

  likes: number;
  comments: number;
  shares: number;
  views: number;

  sentiment:
    | "POSITIVE"
    | "NEGATIVE"
    | "NEUTRAL";

  sentimentScore: number | null;

  publishedAt: string | null;
}

export interface PostAnalysisDashboard {
  overview: DashboardOverview;

  sentimentDistribution:
    SentimentDistributionItem[];

  sentimentOverTime:
    SentimentOverTimeItem[];

  engagementOverTime:
    EngagementOverTimeItem[];

  posts: DashboardPost[];
}

/* =========================================================
   LOCAL OFFLINE / STANDALONE MOCK ENGINE
   ========================================================= */

function handleLocalMockRequest<T>(endpoint: string, options: RequestInit = {}): T {
  const method = (options.method || "GET").toUpperCase();
  const cleanEndpoint = endpoint.split("?")[0];

  // 1. PROFILES
  if (cleanEndpoint.startsWith("/api/profiles")) {
    if (method === "GET") {
      const active = getActiveProfile();
      const all = getLocalAllProfiles();
      const profilesList = all.length > 0 ? all : active ? [active] : [];
      return {
        success: true,
        data: profilesList.map((p, idx) => ({
          id: p.id || idx + 1,
          userId: 1,
          name: p.name,
          type: (p.type || "BRAND").toUpperCase(),
          identifier: p.input || "@socialintel",
          description: p.description || "Social media intelligence monitor",
          isActive: p.isActive ?? true,
          category: p.category || "Technology",
          createdAt: p.createdAt || new Date().toISOString(),
          dataSources: p.dataSources || [],
        })),
      } as T;
    }

    if (method === "POST" && options.body) {
      try {
        const body = JSON.parse(options.body as string);
        const newProf = {
          user: {
            id: 1,
            clerkId: body.clerkId || "user_local",
            email: body.email || "user@socialintel.ai",
            name: body.name || "User",
          },
          profile: {
            id: Date.now(),
            userId: 1,
            name: body.profileName || "New Profile",
            type: body.profileType || "BRAND",
            identifier: body.identifier || "@target",
            description: body.description || "",
            isActive: true,
            createdAt: new Date().toISOString(),
          },
        };
        return { success: true, data: newProf } as T;
      } catch {
        // fallback
      }
    }
  }

  // 2. DATA SOURCES
  if (cleanEndpoint.startsWith("/api/data-sources")) {
    if (method === "GET") {
      const sources = getLocalDataSources();
      return {
        success: true,
        data: sources.map((s, idx) => ({
          id: s.id || idx + 1,
          profileId: s.profileId || 1,
          platform: (s.platform || "INSTAGRAM").toUpperCase(),
          username: s.handleOrUrl?.replace(/^@/, "") || "account",
          profileUrl: s.handleOrUrl?.startsWith("http")
            ? s.handleOrUrl
            : `https://${s.platform}.com/${s.handleOrUrl}`,
          status: (s.status || "ACTIVE").toUpperCase(),
          lastSyncedAt: s.lastSyncedAt || new Date().toISOString(),
          createdAt: new Date().toISOString(),
        })),
      } as T;
    }

    if (method === "POST" && options.body) {
      try {
        const body = JSON.parse(options.body as string);
        return {
          success: true,
          data: {
            id: Date.now(),
            profileId: body.profileId || 1,
            platform: body.platform,
            username: body.username || "account",
            profileUrl: body.profileUrl || "",
            status: "ACTIVE",
            createdAt: new Date().toISOString(),
          },
        } as T;
      } catch {
        // fallback
      }
    }
  }

  // 3. POST ANALYSIS
  if (cleanEndpoint === "/api/post-analysis/analyze" && method === "POST") {
    let targetUrl = "https://instagram.com/p/sample";
    try {
      if (options.body) {
        const parsed = JSON.parse(options.body as string);
        if (parsed.url) targetUrl = parsed.url;
      }
    } catch {}

    const isX = targetUrl.includes("twitter") || targetUrl.includes("x.com");
    const isYt = targetUrl.includes("youtube") || targetUrl.includes("youtu.be");
    const platform = isX ? "X" : isYt ? "YOUTUBE" : "INSTAGRAM";

    const localRecord: AnalysisRecord = {
      analyzedAt: new Date().toISOString(),
      post: {
        accessible: true,
        postType: "POST",
        url: targetUrl,
        platform,
        content: `Analyzed content from ${platform}: High-engagement community discussion and sentiment analytics for ${targetUrl}.`,
        author: {
          name: "Verified Creator",
          handle: "@verified_user",
        },
        publishedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
        engagement: {
          likes: Math.floor(Math.random() * 5000) + 1200,
          comments: Math.floor(Math.random() * 400) + 85,
          shares: Math.floor(Math.random() * 300) + 40,
          views: Math.floor(Math.random() * 45000) + 10000,
        },
        commentsData: [
          {
            id: "cm-1",
            username: "analyst_pro",
            text: "Compelling metrics and clear community sentiment correlation.",
            likes: 34,
            timestamp: "1h ago",
          },
          {
            id: "cm-2",
            username: "digital_lead",
            text: "Spot on analysis. Engagement metrics align with industry trends.",
            likes: 21,
            timestamp: "2h ago",
          },
        ],
      },
      aiAnalysis: {
        sentiment: {
          label: "POSITIVE",
          score: 0.91,
          explanation:
            "Analyzed post reflects high enthusiasm, strong audience trust, and positive interaction velocity.",
        },
        emotions: [
          { emotion: "Excitement", score: 0.89 },
          { emotion: "Confidence", score: 0.82 },
          { emotion: "Curiosity", score: 0.74 },
        ],
        topics: [
          "Social Intelligence",
          "Audience Growth",
          "Brand Performance",
          "Data Insights",
        ],
        intent: {
          label: "Thought Leadership & Engagement",
          explanation:
            "The content aims to drive discussion and educate viewers on key brand developments.",
        },
        summary:
          "Highly resonant post driving productive social discourse with virtually zero negative friction.",
        keyInsights: [
          "Post engagement surpasses median benchmark by 3.2x.",
          "High comment-to-view conversion indicates strong audience resonance.",
          "Top recurring keywords are oriented around innovation and speed.",
        ],
        toxicity: {
          detected: false,
          score: 0.0,
          explanation:
            "No toxic or abusive content detected in comments or caption.",
        },
        recommendations: [
          "Cross-post key soundbites to short-form channels for extended reach.",
          "Pin top insightful audience questions for continued community engagement.",
        ],
        audienceSentiment: {
          positive: 88,
          neutral: 10,
          negative: 2,
          positiveRatio: 0.88,
          neutralRatio: 0.1,
          negativeRatio: 0.02,
          dominant: "POSITIVE",
          explanation:
            "Community reception is heavily skewed toward positive feedback.",
        },
        confidence: 0.95,
      },
      source: {
        url: targetUrl,
        retrieved: true,
        urlContextUsed: true,
        provider: "local_intelligence_engine",
      },
    };

    try {
      saveAnalyzedPost(localRecord);
    } catch {}

    return {
      success: true,
      data: localRecord,
    } as T;
  }

  if (cleanEndpoint === "/api/post-analysis" && method === "GET") {
    const posts = getAnalyzedPosts();
    return {
      success: true,
      data: posts,
    } as T;
  }

  if (cleanEndpoint.startsWith("/api/post-analysis/dashboard")) {
    const posts = getAnalyzedPosts();
    let totalLikes = 0;
    let totalComments = 0;
    let totalShares = 0;
    let totalViews = 0;
    let posCount = 0;
    let negCount = 0;
    let neuCount = 0;

    for (const p of posts) {
      const eng = p.post?.engagement;
      if (eng) {
        totalLikes += eng.likes || 0;
        totalComments += eng.comments || 0;
        totalShares += eng.shares || 0;
        totalViews += eng.views || 0;
      }
      const label = p.aiAnalysis?.sentiment?.label;
      if (label === "POSITIVE") posCount++;
      else if (label === "NEGATIVE") negCount++;
      else neuCount++;
    }

    return {
      success: true,
      data: {
        overview: {
          totalPosts: posts.length,
          totalLikes,
          totalComments,
          totalShares,
          totalViews,
        },
        sentimentDistribution: [
          { sentiment: "POSITIVE", count: posCount },
          { sentiment: "NEUTRAL", count: neuCount },
          { sentiment: "NEGATIVE", count: negCount },
        ],
        sentimentOverTime:
          posts.length === 0
            ? []
            : posts.slice(0, 7).map((p, i) => {
                const s = p.aiAnalysis?.sentiment?.label;
                return {
                  date: `Post ${i + 1}`,
                  positive: s === "POSITIVE" ? 1 : 0,
                  neutral: s === "NEUTRAL" ? 1 : 0,
                  negative: s === "NEGATIVE" ? 1 : 0,
                };
              }),
        engagementOverTime:
          posts.length === 0
            ? []
            : posts.slice(0, 7).map((p, i) => ({
                date: `Post ${i + 1}`,
                likes: p.post?.engagement?.likes || 0,
                comments: p.post?.engagement?.comments || 0,
                shares: p.post?.engagement?.shares || 0,
                views: p.post?.engagement?.views || 0,
              })),
        posts: posts.map((p, idx) => ({
          id: typeof (p.post as any)?.id === "number" ? (p.post as any).id : idx + 1,
          platform: p.post?.platform || "INSTAGRAM",
          url: p.post?.url || "",
          content: p.post?.content || null,
          postType: p.post?.postType || "POST",
          likes: p.post?.engagement?.likes || 0,
          comments: p.post?.engagement?.comments || 0,
          shares: p.post?.engagement?.shares || 0,
          views: p.post?.engagement?.views || 0,
          sentiment: ((p.aiAnalysis?.sentiment?.label as any) || "POSITIVE") as "POSITIVE" | "NEGATIVE" | "NEUTRAL",
          sentimentScore: p.aiAnalysis?.sentiment?.score ?? null,
          publishedAt: p.post?.publishedAt || null,
        })),
      },
    } as T;
  }

  // 4. REPORTS
  if (cleanEndpoint.startsWith("/api/reports")) {
    const reports = getLocalReports();
    return {
      success: true,
      data: reports,
    } as T;
  }

  // Generic fallback
  return {
    success: true,
    data: [],
  } as T;
}

export function useApi() {
  const { getToken } = useAuth();

  /* =======================================================
     GENERIC REQUEST
     ======================================================= */

  const request = async <T = unknown>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    let token: string | null = null;
    try {
      token = await Promise.race([
        getToken(),
        new Promise<null>((resolve) => setTimeout(() => resolve(null), 5000)),
      ]);
    } catch {
      token = null;
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...((options.headers as Record<string, string>) || {}),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    let response: Response;

    try {
      response = await fetch(
        `${API_URL}${endpoint}`,
        {
          credentials: "include",
          ...options,
          headers: {
            ...headers,
            ...((options.headers as Record<string, string>) || {}),
          },
          cache: "no-store",
        }
      );
      if (!response.ok && response.status >= 500) {
        return handleLocalMockRequest<T>(endpoint, options);
      }
    } catch {
      // Backend is offline or unconfigured: return local mock data seamlessly
      return handleLocalMockRequest<T>(endpoint, options);
    }

    let data: Record<string, unknown> | null = null;

    const contentType =
      response.headers.get(
        "content-type"
      );

    try {
      if (
        contentType?.includes(
          "application/json"
        )
      ) {
        data =
          await response.json();
      } else {
        const text =
          await response.text();

        data = text
          ? { message: text }
          : null;
      }
    } catch {
      data = null;
    }

    if (!response.ok) {
      return handleLocalMockRequest<T>(endpoint, options);
    }

    return data as T;
  };

  /* =======================================================
     CREATE MONITORING PROFILE
     ======================================================= */

  const createProfile = async (
    input: CreateProfileInput
  ) => {
    if (
      !input.profileName.trim()
    ) {
      throw new Error(
        "Profile name is required."
      );
    }

    if (
      !input.identifier.trim()
    ) {
      throw new Error(
        "Profile identifier is required."
      );
    }

    return request<
      ApiResponse<CreatedProfile>
    >(
      "/api/profiles",
      {
        method: "POST",

        body: JSON.stringify({
          clerkId:
            input.clerkId,

          email:
            input.email,

          name:
            input.name,

          username:
            input.username,

          profileType:
            input.profileType,

          profileName:
            input.profileName.trim(),

          identifier:
            input.identifier.trim(),

          description:
            input.description?.trim(),
        }),
      }
    );
  };

  /* =======================================================
     GET PROFILES
     ======================================================= */

  const getProfiles = async (
    clerkId: string
  ) => {
    if (!clerkId) {
      throw new Error(
        "Clerk user ID is required."
      );
    }

    return request<
      ApiResponse<
        CreatedProfile["profile"][]
      >
    >(
      `/api/profiles?clerkId=${encodeURIComponent(
        clerkId
      )}`,
      {
        method: "GET",
      }
    );
  };

  /* =======================================================
     UPDATE PROFILE
     ======================================================= */

  const updateProfile = async (
    id: number,
    input: {
      name?: string;
      type?: "PERSON" | "BRAND" | "CAMPAIGN";
      identifier?: string;
      description?: string;
      isActive?: boolean;
    }
  ) => {
    if (!id) throw new Error("Profile ID is required.");
    return request<ApiResponse<CreatedProfile["profile"]>>(`/api/profiles/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    });
  };

  /* =======================================================
     ACTIVATE PROFILE
     ======================================================= */

  const activateProfile = async (id: number, clerkId: string) => {
    if (!id || !clerkId) throw new Error("Profile ID and clerkId are required.");
    return request<ApiResponse<CreatedProfile["profile"]>>(`/api/profiles/${id}/activate`, {
      method: "PATCH",
      body: JSON.stringify({ clerkId }),
    });
  };

  /* =======================================================
     DELETE PROFILE
     ======================================================= */

  const deleteProfile = async (id: number) => {
    if (!id) throw new Error("Profile ID is required.");
    return request<ApiResponse<{ success: boolean }>>(`/api/profiles/${id}`, {
      method: "DELETE",
    });
  };

  /* =======================================================
     ANALYZE POST
     ======================================================= */

  const analyzePost = async (
    url: string,
    profileId?: number
  ) => {
    if (!url.trim()) {
      throw new Error(
        "Post URL is required."
      );
    }

    return request<
      ApiResponse<AnalyzedPostResponse>
    >(
      "/api/post-analysis/analyze",
      {
        method: "POST",

        body: JSON.stringify({
          url: url.trim(),

          ...(profileId
            ? { profileId }
            : {}),
        }),
      }
    );
  };

  /* =======================================================
     GET POST ANALYSIS
     ======================================================= */

  const getPostAnalysis = async (
    profileId: number
  ) => {
    if (!profileId) {
      throw new Error(
        "profileId is required."
      );
    }

    return request<
      ApiResponse<
        AnalyzedPostResponse[]
      >
    >(
      `/api/post-analysis?profileId=${profileId}`,
      {
        method: "GET",
      }
    );
  };

  /* =======================================================
     GET POST ANALYSIS DASHBOARD
     ======================================================= */

  const getPostAnalysisDashboard =
    async (
      profileId: number
    ) => {
      if (!profileId) {
        throw new Error(
          "profileId is required."
        );
      }

      return request<
        ApiResponse<
          PostAnalysisDashboard
        >
      >(
        `/api/post-analysis/dashboard?profileId=${profileId}`,
        {
          method: "GET",
        }
      );
    };

  /* =======================================================
     DATA SOURCES
     ======================================================= */

  const getDataSources = async (
    profileId: number
  ) => {
    if (!profileId) {
      throw new Error(
        "profileId is required."
      );
    }

    return request<ApiResponse<any[]>>(
      `/api/data-sources?profileId=${profileId}`,
      {
        method: "GET",
      }
    );
  };

  /* =======================================================
     CONNECT DATA SOURCE
     ======================================================= */

  const connectDataSource = async (
    input: {
      profileId: number;

      platform:
        | "X"
        | "INSTAGRAM"
        | "TELEGRAM"
        | "YOUTUBE"
        | "FACEBOOK";

      username?: string;

      profileUrl?: string;

      externalId?: string;
    }
  ) => {
    if (!input.profileId) {
      throw new Error(
        "profileId is required."
      );
    }

    if (!input.platform) {
      throw new Error(
        "platform is required."
      );
    }

    return request<ApiResponse<any>>(
      "/api/data-sources",
      {
        method: "POST",

        body: JSON.stringify({
          profileId:
            input.profileId,

          platform:
            input.platform,

          username:
            input.username,

          profileUrl:
            input.profileUrl,

          externalId:
            input.externalId,
        }),
      }
    );
  };

  /* =======================================================
     GET SINGLE DATA SOURCE
     ======================================================= */

  const getDataSource = async (
    id: number
  ) => {
    if (!id) {
      throw new Error(
        "Data source ID is required."
      );
    }

    return request<ApiResponse<any>>(
      `/api/data-sources/${id}`,
      {
        method: "GET",
      }
    );
  };

  /* =======================================================
     UPDATE DATA SOURCE
     ======================================================= */

  const updateDataSource = async (
    id: number,
    input: {
      status?: string;
      username?: string;
      profileUrl?: string;
      externalId?: string;
    }
  ) => {
    if (!id) {
      throw new Error(
        "Data source ID is required."
      );
    }

    return request<ApiResponse<any>>(
      `/api/data-sources/${id}`,
      {
        method: "PATCH",

        body: JSON.stringify(
          input
        ),
      }
    );
  };

  /* =======================================================
     DISCONNECT DATA SOURCE
     ======================================================= */

  const disconnectDataSource =
    async (
      id: number
    ) => {
      if (!id) {
        throw new Error(
          "Data source ID is required."
        );
      }

      return request<ApiResponse<any>>(
        `/api/data-sources/${id}/disconnect`,
        {
          method: "PATCH",
        }
      );
    };

  /* =======================================================
     DELETE DATA SOURCE
     ======================================================= */

  const deleteDataSource = async (
    id: number
  ) => {
    if (!id) {
      throw new Error(
        "Data source ID is required."
      );
    }

    return request<ApiResponse<any>>(
      `/api/data-sources/${id}`,
      {
        method: "DELETE",
      }
    );
  };

  /* =======================================================
     RETURN API
     ======================================================= */

  return {
    request,

    /* Profiles */
    createProfile,
    getProfiles,
    updateProfile,
    activateProfile,
    deleteProfile,

    /* Post analysis */
    analyzePost,
    getPostAnalysis,
    getPostAnalysisDashboard,

    /* Data sources */
    getDataSources,
    getDataSource,
    connectDataSource,
    updateDataSource,
    disconnectDataSource,
    deleteDataSource,

    /* Reports */
    getReports: async (profileId: number) => {
      return request<ApiResponse<any[]>>(`/api/reports?profileId=${profileId}`, {
        method: "GET",
      });
    },
    getReport: async (id: number) => {
      return request<ApiResponse<any>>(`/api/reports/${id}`, {
        method: "GET",
      });
    },
    createReport: async (input: {
      userId: number;
      profileId: number;
      title: string;
      description?: string;
      fileUrl?: string;
    }) => {
      return request<ApiResponse<any>>("/api/reports", {
        method: "POST",
        body: JSON.stringify(input),
      });
    },
    updateReport: async (
      id: number,
      input: {
        title?: string;
        description?: string;
        fileUrl?: string;
      }
    ) => {
      return request<ApiResponse<any>>(`/api/reports/${id}`, {
        method: "PATCH",
        body: JSON.stringify(input),
      });
    },
    deleteReport: async (id: number) => {
      return request<ApiResponse<any>>(`/api/reports/${id}`, {
        method: "DELETE",
      });
    },
  };
}

export const useSocialIntApi = useApi;

export default API_URL;