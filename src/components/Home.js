import React, {Component} from 'react';
import { Form, FormGroup, Label, CardHeader, Container, Row, Col,  Card,CardTitle, CardBody, Input, Button } from 'reactstrap';
import Histogram from './Histogram';
import 'react-rangeslider/lib/index.css'
import Image from './Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoaded: false,
                      channel: 'all',
                      filter: null,
                      isLoading: false,
                      imageSrc: null,
                      url: null,
                      background: '',
                      brightness: 0,
                      contrast: 0,
                      width: 0,
                      height: 0};
        this.updateDimensions = this.updateDimensions.bind(this);
        this.photo = document.createElement('img');
        this.photo.setAttribute('id', 'photo');
      }

      handleImageSelected(evt) {
        let file = document.querySelector('#fileInput').files[0];
        this.loadImage(file);
      }
      
      loadImage(file) {
        this.setState({isLoaded: true});
        let reader = new FileReader();
        reader.addEventListener('load', () => {
            this.setState({imageSrc: reader.result,
                          url: reader.result,
                          filter: null,
                          brightness: 0,
                        contrast: 0});
        }, false);
        
        if (file) {
          toast.success("Load "+file.name);
          reader.readAsDataURL(file);
        }
      }
    
      switchChannel(channel) {
        this.setState({channel: channel});
      }

      switchFilter(filter) {
        toast.success("Change filter to " +filter);
        this.setState({filter: filter});
      }
      switchReset(filter) {
        toast.success("Reset Image");
        this.setState({filter: filter,
                      brightness: 0,
                    contrast: 0});
      }
      updateDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
      }
    
      componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
      }
    
      componentWillMount() {
        this.updateDimensions();
      }
    
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
      }
    
      renderPlaceholder() {
        return (
          <div id="photo-placeholder">
           <FontAwesomeIcon icon="image" style={{ color: 'blue' }} size="6x"/>
          </div>
        );
      }
    
      renderPhoto() {
        return (
          <img id="photo" src={this.state.url}  />
        );
      }
      renderButton() {
        return (
        <>
        <Button outline color="primary" size="lg" active onClick={() => document.getElementById('fileInput').click()} >Upload Image</Button>
        </>
        );
      }
      renderButtonEnhance() {
        return (
          <Container className="mt-4 pb-4">
      <Row>
        <Col>
        <Form>
      <FormGroup row>
        <Label sm={2}>Brightness</Label>
        <Col sm={7}>
          <Input type="number" 
               value={this.state.brightness}
               onChange={e => this.setState({ brightness: e.target.value })} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>Contrast</Label>
        <Col sm={7}>
          <Input ttype="number" 
               value={this.state.contrast}
               onChange={e => this.setState({ contrast: e.target.value })} />
        </Col>
      </FormGroup>
    </Form>
        </Col>

        <Col>
        <Row>
        <Button outline color="primary" size="lg" active onClick={() => this.switchFilter("robert")} >Robert</Button>
        <Button className="ml-2" outline color="primary" size="lg" active onClick={() => this.switchFilter("sobel")} >Sobel</Button>
        <Button className="ml-2" outline color="primary" size="lg" active onClick={() => this.switchReset(null)} >Reset</Button>
        </Row>
        <Row>
        <Button className="mt-2" outline color="primary" size="lg" active onClick={() => document.getElementById('fileInput').click()} >Change Image</Button>
        </Row>
        </Col>
        </Row>
    </Container>
        
        );
      }
      
      renderEnhance() {
        return (
            <Image src={this.state.imageSrc} brightness={this.state.brightness} contrast={this.state.contrast} filter={this.state.filter}/>
        );
      }

      render() {

        return (
    <Container className="mt-4 pb-4">
      <Row className="text-center pt-2">
        <Col>
        <h1 style={{ fontWeight: 'bold' }}>Image Enhance</h1>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card className="shadow-sm" style={{  height: '400px' }}>
          <CardHeader className="text-center" tag="h4" style={{ backgroundColor: 'white'}}>Original Image</CardHeader>
            <CardBody id="photo-block" >
                {this.state.isLoaded ? this.renderPhoto() : this.renderPlaceholder()}
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-sm" style={{ height: '400px' }}>
          <CardHeader className="text-center" tag="h4" style={{ backgroundColor: 'white'}}>Histogram</CardHeader>
            <Histogram src={this.state.imageSrc} channel={this.state.channel} />
          </Card>
        </Col>
      </Row>
      {this.state.isLoaded ? this.renderEnhance() : null}
      <Row className="text-center mt-4"> 
        <Col>
          <Input id="fileInput" type="file" accept="image/jpeg" style={{display: 'none'}}
          onChange={this.handleImageSelected.bind(this)}>
          </Input>
          {this.state.isLoaded ? this.renderButtonEnhance() : this.renderButton()}
        </Col>
      </Row>
      <ToastContainer color="red" position={toast.POSITION.BOTTOM_RIGHT} />
    </Container>
);
}
}
export default Home;