export const IMAGE_IDS = {
  // Hero Section
  HERO_BG: "https://drive.google.com/file/d/17VhWNVEnxA7fjPVwduxM-FK44U6ngGqT/view?usp=drive_link",

  // Dresses Collection
  DRESS_AUDREY: "https://drive.google.com/file/d/1XC1YsN62uu9AE0TFL75G1LEbqJ-9w3D5/view?usp=drive_link",
  DRESS_GRACE: "https://drive.google.com/file/d/1q3oabhz6Y0Ak2Obm2bWNGIJX1NLtfEgk/view?usp=drive_link",
  DRESS_MARILYN: "https://drive.google.com/file/d/1q-mKbDpHnRnNkrSvAUqhnp154H9U8yQL/view?usp=drive_link",

  // Shoes Collection
  SHOE_CINDERELLA: "https://drive.google.com/file/d/1tLa69v0kgTm7Bqk1hGCBuJ--tNyFNegw/view?usp=drive_link",
  SHOE_HOLLYWOOD: "https://drive.google.com/file/d/1rXxePhrKbmUQD6_ZzE_U-Pfc3c0TKSAh/view?usp=drive_link",

  // About Section
  ABOUT_MAIN: "https://drive.google.com/file/d/1HH7vMI7BdLZ5fLzN8xeAG6PF4MQ4xYI-/view?usp=drive_link",
  ABOUT_DETAIL: "1AN8fhANIfsTzFNF79534FID8vbL5r8SE",

  // Blog Posts
  BLOG_DRAPERY: "https://drive.google.com/file/d/1AN8fhANIfsTzFNF79534FID8vbL5r8SE/view?usp=drive_link",
  BLOG_CINEMA: "https://drive.google.com/file/d/1q-mKbDpHnRnNkrSvAUqhnp154H9U8yQL/view?usp=drive_link",
  BLOG_TRENDS: "https://drive.google.com/file/d/1q-mKbDpHnRnNkrSvAUqhnp154H9U8yQL/view?usp=drive_link",
};

export const GOOGLE_DRIVE_BASE_URL = "https://lh3.googleusercontent.com/d/";

export const getDriveImage = (idOrLink: string) => {
  if (!idOrLink) return "";

  let id = idOrLink;
  
  // Robust extraction of ID from any Google Drive link format
  if (idOrLink.includes('drive.google.com')) {
    // Matches /d/ID, /file/d/ID, or id=ID
    const idMatch = idOrLink.match(/\/d\/([a-zA-Z0-9_-]{25,})/) || 
                    idOrLink.match(/id=([a-zA-Z0-9_-]{25,})/);
    
    if (idMatch && idMatch[1]) {
      id = idMatch[1];
    }
  }

  // Si l'ID semble valide (chaîne longue sans slash)
  if (id.length >= 25 && !id.includes('/')) {
    // lh3.googleusercontent.com est très fiable pour l'affichage direct
    // alternativement on peut utiliser https://docs.google.com/uc?export=view&id=${id}
    return `https://lh3.googleusercontent.com/d/${id}`;
  }
  
  return idOrLink;
};
