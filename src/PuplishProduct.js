import React from 'react';
import ChainInterFace from "./interface";

let chainInterface = new ChainInterFace();

class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {file: '',imagePreviewUrl: ''};
    }

    _handleSubmit(e) {
        e.preventDefault();
        console.log('handle uploading-', this.state.file);
    }
    uploadDone = () => {
        this.props.click(this.state.file);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
            this.uploadDone();
        }

        reader.readAsDataURL(file)
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} alt="previw" />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return (
            <div className="previewComponent">

                    <input className="fileInput"
                           type="file"
                           onChange={(e)=>this._handleImageChange(e)} />
                    <button className="submitButton"
                            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
                <div className="imgPreview">
                    {$imagePreview}
                </div>
            </div>
        )
    }
}





export default  class PublishProduct extends React.Component{
    constructor(props){

        super(props);
        this.state = {
            imagefile: '',
            name:'',
            owner:'',
            price:'',
            minprice:'',

        }


    }
    postSimulation = (e) => {

        if (this.state.imagefile===''){
            alert("File not uploaded");
        }
        else{
            console.log(e.target[0].value);
            console.log(e.target[1].value);
            console.log(e.target[2].value);
            console.log(e.target[3].value);
            chainInterface.publishProduct(e.target[0].value,e.target[1].value,
                                          e.target[2].value ,e.target[3].value )


        }

    }
    callpublis(){
        console.log("Publish here");
        chainInterface.publishProduct("Fatih",1,2,3,4);
    }
    header = (file) => {
        this.setState({imagefile:file});
        console.log(file);
    }


    render() {

        return(
            <div className="row" align="center">
                <div className="col-md-6 col-md-offset-3">
                    <h2>Publish  Product</h2>

                    <form  onSubmit={(e)=>this.postSimulation(e)}>
                        <div className="row">
                            <div className="col-sm-6 form-group">
                                <label htmlFor="name">
                                    NameofProduct </label>
                                <input type="text" className="form-control" id="nameofProduct" name="nameofProduct"
                                       maxLength="50"/>
                            </div>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="name">
                                    Owner </label>
                                <input type="text" className="form-control" id="owner" name="owner"
                                       maxLength="50" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 form-group">
                                <label htmlFor="email">
                                    MinPrice in ether</label>
                                <input type="number" className="form-control" id="minPrice" name="minPrice"
                                       maxLength="50"/>
                            </div>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="email">
                                    Price in ether</label>
                                <input type="number" className="form-control" id="price" name="price" required
                                       maxLength="50"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 form-group">
                                <ImageUpload click={this.header}/>

                            </div>
                        </div>

                        <div className="row">

                            <div className="col-sm-12 form-group">
                                <button  onClick={this.callpublis()} className="btn btn-lg btn-success btn-block"
                                        id="btnContactUs">Post It!
                                </button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>


        );

    }
}