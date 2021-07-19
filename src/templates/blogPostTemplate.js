import React, { Fragment } from "react"
import BlogBanner from "../components/Blog/BlogBanner"
import BlogContent from "../components/Blog/BlogContent"
import BlogSummary from "../components/Blog/BlogSummary"
import BlogTopic from "../components/Blog/BlogTopic"
import BlogWriters from "../components/Blog/BlogWriters"
import Layout from "../components/layout"
import CloseIcon from "../assets/Icons/close-circle.svg"
import BlogFooterBanner from "../components/Blog/BlogFooterBanner"
import Seo from "../components/seo"
import { graphql } from "gatsby"
import ContentfulRichText from "../components/common/ContentfulRichText"

export default function BlogPostTemplate(props) {
  console.log("BlogPostTemplate->props", props)

  const {
    data: { contentfulPost: data },
    context,
  } = props

  return (
    <Fragment>
      <Seo title="blog" />
      <BlogBanner
        title={data?.title || ""}
        bannerSrc={data?.banner.fixed.src || null}
        shortDescription={data?.shortDescription.shortDescription || ""}
      />
      <div className="container">
        <BlogSummary author={data?.author || null} updatedAt={data.updatedAt} />
        <BlogTopic topics={data?.topics || []} />
        {/* <ContentfulRichText content={data.content} /> */}
        <BlogContent content={data?.content || ""} />
        <BlogWriters
          author={data.author}
          editor={data.editor}
          reviewer={data.reviewer}
        />
        <div className="blog">
          <button className="btn">
            View more
            <CloseIcon />
          </button>
        </div>
      </div>
      <BlogFooterBanner />
    </Fragment>
  )
}

export const pageQuery = graphql`
  query PostDetailsBySlug($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      title
      shortDescription {
        shortDescription
      }
      banner {
        fixed(width: 2000, quality: 100) {
          src
          width
          height
        }
      }
      content {
        json
        childContentfulRichText {
          html
        }
      }
      topics {
        title
        slug
      }
      createdAt
      updatedAt
      author {
        name
        position
        email
        twitterUsername
        avatar {
          fixed {
            src
            width
            height
            srcSet
          }
        }
      }
      reviewer {
        name
        position
        avatar {
          fixed {
            src
            width
            height
            srcSet
          }
        }
      }
      editor {
        name
        position
        avatar {
          fixed {
            src
            width
            height
            srcSet
          }
        }
      }
    }
  }
`