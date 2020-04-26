import react from 'react';
import QRCode from 'qrcode.react';

export default class extends react.Component {

	static defaultProps = {
		value: ''
	};

	img = null;

	componentDidUpdate() {
		var canvas = document.querySelector('#qr > canvas');
		this.img.src = canvas.toDataURL();
	}

	render() {
		return (
		<div>
			<div id='qr' style={{display:'none'}}>
				<QRCode value={this.props.value} level={'L'} includeMargin/>
			</div>
			<img ref={ref=>this.img=ref} width={192}/>
		</div>
		);
	}

}
