window.onload = () => {
	const warningEl = document.getElementById('warning');
	const videoElement = document.getElementById('videoElement');
	const captureBtn = document.getElementById('captureBtn');
	const startBtn = document.getElementById('startBtn');
	const stopBtn = document.getElementById('stopBtn');
	const download = document.getElementById('download');
	const micAudioToggle = document.getElementById('micAudioToggle');
	
	if('getDisplayMedia' in navigator.mediaDevices) warningEl.style.display = 'none';

	let blobs;
	let blob;
	let rec;
	let stream;
	let voiceStream;
	let desktopStream;

	captureBtn.onclick = async () => {
		download.style.display = 'none';
		const mic = micAudioToggle.checked || false;
		let tracks;
		
		desktopStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
		
		if (mic === true) {
			voiceStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
			tracks = [
				...desktopStream.getVideoTracks(), 
				...voiceStream.getAudioTracks()
			];
		} else {
			tracks = [
				...desktopStream.getVideoTracks()
			];
		}

		console.log('Tracks to add to stream', tracks);
		stream = new MediaStream(tracks);
		console.log('Stream', stream)
		videoElement.srcObject = stream;
		videoElement.muted = true;
			
		blobs = [];
	
		rec = new MediaRecorder(stream, {mimeType: 'video/webm; codecs=vp8,opus'});
		rec.ondataavailable = (e) => blobs.push(e.data);
		rec.onstop = async () => {
			
			blob = new Blob(blobs, {type: 'video/webm'});
			let url = window.URL.createObjectURL(blob);
			download.href = url;
			download.download = 'test.webm';
			download.style.display = 'block';
		};	
		startBtn.disabled = false;
		captureBtn.disabled = true;
		micAudioToggle.disabled = true;
	};

	startBtn.onclick = () => {
		startBtn.disabled = true;
		stopBtn.disabled = false;
		rec.start();
	};

	stopBtn.onclick = () => {
		captureBtn.disabled = false;
		micAudioToggle.disabled = false;
		startBtn.disabled = true;
		stopBtn.disabled = true;
		
		rec.stop();
		
		stream.getTracks().forEach(s=>s.stop())
		videoElement.srcObject = null
		stream = null;
	};
};