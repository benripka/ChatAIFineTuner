import {connect} from "react-redux";
import {MyFileDrop} from "../components/FileDrop";


const Page = (props) => {

}

const mapDispatchToProps = dispatch => ({
    setFiles: files => dispatch({type: 'ADD_FILES', files: files})
});

const mapStateToProps = state => ({
    files: state.files
})

export default connect(mapStateToProps, mapDispatchToProps)(Page);