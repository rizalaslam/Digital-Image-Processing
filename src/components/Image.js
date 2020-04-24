import React, {Component} from 'react';
import { CardHeader, Row, Col, Card, Spinner, CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Histogram from './Histogram';
import { toast } from 'react-toastify';
import './Histogram.css';


class Image extends Component {

    constructor(props) {
        super(props);
        this.primaryChannels = {};
        this.maxValue = 0;
        this.ImageDatas = {};
        this.state = {
          imageSrc: null,
          enhanceSrc: null,
          channel: 'all',
          filter: null,
          contrast: 0,
          brightness: 0,
          isLoading: false,
        };
      }

  componentDidUpdate(prevProps, prevState) {
    const props = this.props;
    const isImageChanged = this.state.imageSrc !== props.src;
      if (isImageChanged) {
      toast.success("Processing Image");
      this.handleImageChanged(props.src);
      return;
      }

    const isFilterBrightnessChanged = this.state.filter !== props.filter || this.state.brightness !== props.brightness || this.state.contrast !== props.contrast;
    if (isFilterBrightnessChanged) {
    this.handleFilterBrightnessContrastChanged(props.filter, props.brightness, props.contrast);
    return;
    }
  }

  handleImageChanged(propSrc) {
    this.setState({imageSrc: propSrc,
                  filter: null,
                  isLoading: true});
    setTimeout(() => {
        this.getPixel();
        this.loadImage();
        this.setState({isLoading: false});
        toast.success("Image Processed");
    }, 1000);
  }

  handleFilterBrightnessContrastChanged(propFilter, propBrightness, propContrast) {
    this.setState({filter: propFilter,
                  brightness: propBrightness,
                  contrast: propContrast,
                  isLoading: true});
    setTimeout(() => {
      this.getPixel();
      this.setBrightness();
      this.setContrast();
      this.loadImage();
      this.setState({isLoading: false});
    }, 4000);
  }


  getImage() {
    let lol = this.ImageDatas;
    let joss = document.createElement('canvas');
      joss.width = this.width;
      joss.height = this.height;
    let lel = joss.getContext('2d');
      lel.putImageData(lol,0,0);
    this.setState({
      enhanceSrc: joss.toDataURL()
    });
  }
  
  getRobert() {
    let {data} = this.ImageDatas;
    const matrice = (kernel, x ,y, binder) => (
        (kernel[0][0] * binder(x, y)) +
        (kernel[0][1] * binder(x + 1, y)) +
        (kernel[1][0] * binder(x, y + 1)) +
        (kernel[1][1] * binder(x + 1, y + 1))
    );
    const kernelX = [
        [1, 0],
        [0, -1]
    ];
    const kernelY = [
        [0, 1],
        [-1, 0]
    ];

    let processed = [];
    const bindAt = (data) => (x, y, i = 0) => data[((this.width * y) + x) * 4 + i];
    let pixelAt = bindAt(data);

    pixelAt = bindAt(data);
    for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
            const pixelX = matrice(kernelX, x, y, pixelAt);
            const pixelY = matrice(kernelY, x, y, pixelAt);
            const magnitude = Math.sqrt((pixelX * pixelX) + (pixelY * pixelY)) >>> 0;
            processed.push(magnitude, magnitude, magnitude, 255);
      }
    }
    this.ImageDatas.data.set(new Uint8ClampedArray(processed));
    let canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    let img = canvas.getContext('2d');
      img.putImageData(this.ImageDatas,0,0);
    this.setState({
      enhanceSrc: canvas.toDataURL()
    });
  }

  getSobel() {
    let {data} = this.ImageDatas;
    const matrice = (kernel, x ,y, binder) => (
      (kernel[0][0] * binder(x - 1, y - 1)) +
      (kernel[0][1] * binder(x, y - 1)) +
      (kernel[0][2] * binder(x + 1, y - 1)) +
      (kernel[1][0] * binder(x - 1, y)) +
      (kernel[1][1] * binder(x, y)) +
      (kernel[1][2] * binder(x + 1, y)) +
      (kernel[2][0] * binder(x - 1, y + 1)) +
      (kernel[2][1] * binder(x, y + 1)) +
      (kernel[2][2] * binder(x + 1, y + 1))
  );

    const kernelX = [
            [-1, 0, 1],
            [-2, 0, 2],
            [-1, 0, 1]
        ];

        const kernelY = [
            [-1, -2, -1],
            [0, 0, 0],
            [1, 2, 1]
        ];

        let processed = [];

        const bindAt = (data) => (x, y, i = 0) => data[((this.width * y) + x) * 4 + i];
        let pixelAt = bindAt(data);

        pixelAt = bindAt(data);

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const pixelX = matrice(kernelX, x, y, pixelAt);
                const pixelY = matrice(kernelY, x, y, pixelAt);
                const magnitude = Math.sqrt((pixelX * pixelX) + (pixelY * pixelY)) >>> 0;

                processed.push(magnitude, magnitude, magnitude, 255);
            }
        }

    this.ImageDatas.data.set(new Uint8ClampedArray(processed));
    let canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    let img = canvas.getContext('2d');
      img.putImageData(this.ImageDatas,0,0);
    this.setState({
      enhanceSrc: canvas.toDataURL()
    });
  }
    
  getPixel() {
    let img = document.getElementById('photo');
    this.width = img.width;
    this.height = img.height;
    let canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    this.ImageDatas = canvas.getContext('2d').getImageData(0, 0, img.width, img.height);
    let {data} = this.ImageDatas;
    let process = [];
    const bindAt = (data) => (x, y, i = 0) => data[((this.width * y) + x) * 4 + i];
    let pixelAt = bindAt(data);
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const r = pixelAt(x, y, 0) + 255 * (this.state.brightness/100);
                const g = pixelAt(x, y, 1) + 255 * (this.state.brightness/100);
                const b = pixelAt(x, y, 2) + 255 * (this.state.brightness/100);
                process.push(r, g, b, 255);
            }
        }
  this.ImageDatas.data.set(new Uint8ClampedArray(process));
  }

setBrightness() {
  let {data} = this.ImageDatas;
    let process = [];
    const bindAt = (data) => (x, y, i = 0) => data[((this.width * y) + x) * 4 + i];
    let pixelAt = bindAt(data);
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const r = pixelAt(x, y, 0) + 255 * (this.state.brightness/100);
                const g = pixelAt(x, y, 1) + 255 * (this.state.brightness/100);
                const b = pixelAt(x, y, 2) + 255 * (this.state.brightness/100);
                process.push(r, g, b, 255);
            }
        }
  this.ImageDatas.data.set(new Uint8ClampedArray(process));
}

setContrast() {
  let {data} = this.ImageDatas;
    let process = [];
    const factor = (259 * (this.state.contrast + 255)) / (255 * (259 - this.state.contrast));
    const bindAt = (data) => (x, y, i = 0) => data[((this.width * y) + x) * 4 + i];
    let pixelAt = bindAt(data);
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const r = factor * (pixelAt(x, y, 0)  - 128) + 128;
                const g = factor * (pixelAt(x, y, 1)  - 128) + 128;
                const b = factor * (pixelAt(x, y, 2)  - 128) + 128;
                process.push(r, g, b, 255);
            }
        }
  this.ImageDatas.data.set(new Uint8ClampedArray(process));
}


  loadImage() {
  if (this.state.filter == null) {
    this.getImage();
    } 
  else if (this.state.filter === "robert") {
      this.getRobert();
  } else {
      this.getSobel();
    }
  }
  
  renderImage() {
    const props = this.props;
    if (props.src === null) {
      return (
        <div id="photo-placeholder">
        <FontAwesomeIcon icon="image" style={{ color: 'blue' }} size="6x" />
       </div>
      );
    }
    if (this.state.isLoading) {
      return (
        <Spinner color="secondary" id="photo" animation="border" variant="primary"/>
      );
    }
    return (
        <img id="enhance" src={this.state.enhanceSrc}  />
    );
  }

  render() {
    return (
      <Row className="mt-4">
      <Col>
        <Card className="shadow-sm" style={{  height: '400px' }}>
        <CardHeader className="text-center" tag="h4" style={{ backgroundColor: 'white'}}>Enhanced Image</CardHeader>
          <CardBody id="photo-block" >
          {this.renderImage()}
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card className="shadow-sm" style={{ height: '400px' }}>
        <CardHeader className="text-center" tag="h4" style={{ backgroundColor: 'white'}}>Histogram</CardHeader>
          <Histogram src={this.state.enhanceSrc} channel={this.state.channel} />
        </Card>
      </Col>
    </Row>
    );
  }
}

export default Image;
