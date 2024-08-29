import { DOMAIN } from "@/utils/constants";
import { SingleArticle } from "@/utils/type";
import { Article } from "@prisma/client";

// Fetch articles by page number
export async function getArticles(
  pageNumber: string | undefined
): Promise<Article[]> {
  const response = await fetch(
    `${DOMAIN}/api/articles?pageNumber=${pageNumber}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return response.json();
}

// Fetch the number of articles
export async function getArticlesCount(): Promise<number> {
  const response = await fetch(`${DOMAIN}/api/articles/count`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch articles count");
  }
  const { count } = (await response.json()) as { count: number };
  return count;
}

// Fetch articles based on searching
export async function getArticlesBasedOnSearch(
  searchText: string
): Promise<Article[]> {
  const response = await fetch(
    `${DOMAIN}/api/articles/search?searchText=${searchText}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch articles based on search");
  }
  return response.json();
}

// Fetch single article by id
export async function getSingleArticle(
  articleId: string
): Promise<SingleArticle> {
  const response = await fetch(`${DOMAIN}/api/articles/${articleId}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  return response.json();
}

