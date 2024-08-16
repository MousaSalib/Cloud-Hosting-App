import { getArticles } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/Articles/ArticleItem";
import Pagination from "@/components/Articles/Pagination";
import SearchArticleInput from "@/components/Articles/SearchArticleInput";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import prisma from "@/utils/db";
import { Article } from "@prisma/client";

interface ArticlePageProps {
  searchParams: { pageNumber: string };
}

const ArticlesPage = async ({ searchParams }: ArticlePageProps) => {
  const { pageNumber } = searchParams;

  const articles: Article[] = await getArticles(pageNumber);
  const count: number = await prisma.article.count();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);
  return (
    <section className="container m-auto px-5">
      <SearchArticleInput />
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.map((item) => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      <Pagination
        pageNumber={parseInt(pageNumber)}
        route="/articles"
        pages={pages}
      />
    </section>
  );
};

export default ArticlesPage;
