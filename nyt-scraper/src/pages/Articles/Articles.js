import React, { Component } from "react";
import API from "../../utils/API";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import { Col, Container, Row } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Articles extends Component  {
    state = {
        articles: [],
        title: "",
        author: "",
      };

      componentDidMount() {
        this.loadArticles();
      }

      loadArticles = () => {
        API.getArticles()
          .then(res =>
            this.setState({ articles: res.data, title: "", author: "" })
          )
          .catch(err => console.log(err));
      };
    
      deleteArticle = id => {
        API.deleteArticle(id)
          .then(res => this.loadArticles())
          .catch(err => console.log(err));
      };
    
      handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };
    
      handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.title && this.state.author) {
          API.saveArticle({
            title: this.state.title,
            author: this.state.author
          })
            .then(res => this.loadArticles())
            .catch(err => console.log(err));
        }
      };
    
      render() {
        return (
          <Container fluid>
            <Row>
              <Col size="md-6">
                <Jumbotron>
                  <h1>Articles List</h1>
                </Jumbotron>
                <form>
                  <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="title"
                    placeholder="Title (required)"
                  />
                  <Input
                    value={this.state.author}
                    onChange={this.handleInputChange}
                    name="author"
                    placeholder="Author (required)"
                  />
                  <FormBtn
                    disabled={!(this.state.author && this.state.title)}
                    onClick={this.handleFormSubmit}
                  >
                    Search Articles
                  </FormBtn>
                </form>
              </Col>
              <Col size="md-6 sm-12">
                <Jumbotron>
                  <h1>Saved Articles</h1>
                </Jumbotron>
                {this.state.articles.length ? (
                  <List>
                    {this.state.articles.map(article => (
                      <ListItem key={article._id}>
                        <Link to={"/articles/" + article._id}>
                          <strong>
                            {article.title} by {article.author}
                          </strong>
                        </Link>
                        <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <h3>No Results to Display</h3>
                )}
              </Col>
            </Row>
          </Container>
        );
      }
    }
    
    export default Articles;
    


    }