export const IMAGE_IDS = {
  // Hero Section
  HERO_BG: "17VhWNVEnxA7fjPVwduxM-FK44U6ngGqT",

  // Dresses Collection
  DRESS_AUDREY: "1XC1YsN62uu9AE0TFL75G1LEbqJ-9w3D5",
  DRESS_GRACE: "1q3oabhz6Y0Ak2Obm2bWNGIJX1NLtfEgk",
  DRESS_MARILYN: "1q-mKbDpHnRnNkrSvAUqhnp154H9U8yQL",

  // Shoes Collection
  SHOE_CINDERELLA: "1tLa69v0kgTm7Bqk1hGCBuJ--tNyFNegw",
  SHOE_HOLLYWOOD: "1rXxePhrKbmUQD6_ZzE_U-Pfc3c0TKSAh",

  // About Section
  ABOUT_MAIN: "1HH7vMI7BdLZ5fLzN8xeAG6PF4MQ4xYI-",
  ABOUT_DETAIL: "1AN8fhANIfsTzFNF79534FID8vbL5r8SE",

  // Blog Posts
  BLOG_DRAPERY: "1AN8fhANIfsTzFNF79534FID8vbL5r8SE",
  BLOG_CINEMA: "1q-mKbDpHnRnNkrSvAUqhnp154H9U8yQL",
  BLOG_TRENDS: "1q-mKbDpHnRnNkrSvAUqhnp154H9U8yQL",
};

export const getDriveImage = (idOrLink: string) => {
  if (!idOrLink) return "";

  // Si c'est déjà une URL directe, on la retourne
  if (idOrLink.includes('lh3.googleusercontent.com')) return idOrLink;

  let id = idOrLink;
  
  // Extraction de l'ID si c'est un lien de partage classique
  if (idOrLink.includes('drive.google.com')) {
    const idMatch = idOrLink.match(/\/d\/([a-zA-Z0-9_-]{25,})/) || 
                    idOrLink.match(/id=([a-zA-Z0-9_-]{25,})/);
    
    if (idMatch && idMatch[1]) {
      id = idMatch[1];
    }
  }

  // Formatage final en URL directe haute fiabilité
  if (id.length >= 25 && !id.includes('/')) {
    return `https://lh3.googleusercontent.com/d/${id}`;
  }
  
  return idOrLink;
};
