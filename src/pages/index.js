import * as React from "react"
import {graphql, useStaticQuery} from "gatsby";
import {GatsbyImage, getImage} from "gatsby-plugin-image";


const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allFieldWithImages {
        nodes {
          title
          childFile {
            childImageSharp {
              gatsbyImageData(
              width:200)
            }
          }
        }
      }
    }
  `)

  return (
    <main >
      {data?.allFieldWithImages?.nodes?.map((item,i)=>{
        return(
            <div>
              <h2>{item.title}</h2>
              <figure>
                <GatsbyImage  alt={"ddd"} image={getImage(item.childFile )}/>
              </figure>
            </div>
        )

      })}
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
