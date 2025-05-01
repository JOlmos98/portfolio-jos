export type UserDTO = {
    name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string | null;
    bio?: string | null;
    website?: string | null;
  };
  
  export type ArticleDTO = {
    userId: number;
    url: string;
    title: string;
    imageUrl?: string;
    description?: string;
  };
  
  export type ArticleRequestDTO = {
    userId: number;
    url: string;
    title: string;
    description?: string;
  };

  export type TagDTO = {
    name: string;
  };

//   export type SavedArticleDTO = {
//     userId: number;
//     articleId: number;

//   };

//   export type ArticleTagDTO = {
//     articleId: number;
//     tagId: number;
//   };

//!     createdAt: Date;