import React, { Component } from 'react';
import Layout from '../components/layout';
import Img from 'gatsby-image';
import Markdown from '../components/Markdown';
import {
  CarouselTwoSlider,
  CarouselWithThumbnails,
} from '../components/Carousel';

/**
 * @file home.js is the home page desplays product and Message components
 * @author Stephen Kelehan and Nyasha Mutangadura
 */

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.data.markdownRemark.frontmatter.homePage;
    const { sectionA, sectionB, sectionC, sectionD } = data;

    return (
      <div className="homePage">
        <div className="homePage-section-1 container">
          <div className="homePage-section-1-left">
            <Img
              fluid={sectionA.img.childImageSharp.fluid}
              objectFit="cover"
              className="homePage-section-1-left-img"
            />
          </div>
          <div className="homePage-section-1-right">
            <div className="homePage-section-1-right-text">
              <Markdown markdown={sectionA.paragraph}></Markdown>
            </div>
            <div className="homePage-section-1-right-btns">
              <div className="homePage-section-1-right-btns-men">
                MEN
              </div>
              <div className="homePage-section-1-right-btns-women">
                WOMEN
              </div>
            </div>
          </div>
        </div>
        <div className="line"></div>
        <div className="homePage-section-2 container">
          <div className="homePage-section-2-title">
            {sectionB.title}
          </div>
          <CarouselTwoSlider data={sectionB.slider} />
        </div>
        <div className="line"></div>
        <div className="homePage-section-3 container">
          <div className="homePage-section-3-title">
            {sectionC.title}
          </div>
          <div className="homePage-section-3-grid">
            <div className="homePage-section-3-grid-right">
              <Img
                fixed={sectionC.femaleImg.childImageSharp.fixed}
                objectFit="cover"
              />
              <div className="homePage-section-3-grid-right-btns">
                <div className="homePage-section-3-grid-right-btns-men">
                  MENS
                </div>
                <div className="homePage-section-3-grid-right-btns-women">
                  WOMENS
                </div>
              </div>
            </div>
            <div className="homePage-section-3-grid-left">
              <Img
                fixed={sectionC.maleImg.childImageSharp.fixed}
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        <div className="line"></div>
        <div className="homePage-section-4 container">
          <div className="homePage-section-4-title">
            {sectionD.title}
          </div>
          <div className="homePage-section-4-grid">
            <div className="homePage-section-4-grid-right">
              <div classname="homePage-section-4-grid-right-img">
                <Img
                  fixed={sectionD.femaleImg.childImageSharp.fixed}
                />
              </div>
            </div>
            <div className="homePage-section-4-grid-left">
              <Img
                fixed={sectionD.maleImg.childImageSharp.fixed}
                classname="homePage-section-4-grid-left-img"
              />
              <div className="homePage-section-4-grid-left-btns">
                <div className="homePage-section-4-grid-left-btns-men">
                  MENS
                </div>
                <div className="homePage-section-4-grid-left-btns-women">
                  WOMENS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const HomePageBase = ({ data }) => (
  <Layout>
    <Home data={data} />
  </Layout>
);

export const pageQuery = graphql`
  query HomeQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        homePage {
          title
          sectionA {
            paragraph
            img {
              childImageSharp {
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          sectionB {
            title
            slider {
              imageOne {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              imageTwo {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              link
            }
          }
          sectionC {
            title
            maleImg {
              childImageSharp {
                fixed(width: 500, quality: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            femaleImg {
              childImageSharp {
                fixed(width: 500, quality: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            maleLink
            femaleLink
          }
          sectionD {
            title
            maleImg {
              childImageSharp {
                fixed(height: 500, quality: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            femaleImg {
              childImageSharp {
                fixed(height: 500, quality: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            maleLink
            femaleLink
          }
        }
      }
    }
  }
`;

export default HomePageBase;
