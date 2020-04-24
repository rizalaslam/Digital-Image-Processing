import React, {Component} from 'react';
import { ListGroupItem, ListGroup, Container, Jumbotron, Media,  Card,CardTitle, CardBody, Input, Button } from 'reactstrap';
import image from '../image/example.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from "@fortawesome/free-solid-svg-icons";

class About extends Component {
      
    render() {
        return (
            <div>
            <Jumbotron fluid className="text-center">
            <Container fluid>
              <h1 className="display-3">Digital Image Processing App</h1>
            </Container>
          </Jumbotron>
          <Container>
          <Media>
          <Media left href="#">
            <Media className="shadow" object src={image} style={{ width: '500px' }} />
          </Media>
          <Media className="ml-3"body>
            <Media heading>
              Reference :
            </Media>
            <ListGroup>
      <ListGroupItem>https://www.dfstudios.co.uk/articles/programming/image-programming-algorithms/image-processing-algorithms-part-5-contrast-adjustment/</ListGroupItem>
      <ListGroupItem>https://css-tricks.com/manipulating-pixels-using-canvas/</ListGroupItem>
      <ListGroupItem>https://www.html5rocks.com/en/tutorials/canvas/imagefilters/</ListGroupItem>
      <ListGroupItem>https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter</ListGroupItem>
    </ListGroup>
          </Media>
        </Media>
        
        </Container>
        </div>
);
}
}
export default About;