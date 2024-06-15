// // // Global variables
// // let localStream;
// // let peerConnection;

// // // Function to handle getUserMedia errors
// // function handleGetUserMediaError(e) {
// //     console.error('getUserMedia() error:', e);
// // }

// // // Function to start the call
// // function startCall() {
// //     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
// //         .then(function (stream) {
// //             // Display local video stream
// //             const localVideo = document.getElementById('localVideo');
// //             localVideo.srcObject = stream;
// //             localStream = stream;

// //             // Create a peer connection with STUN server configuration
// //             const configuration = {
// //                 iceServers: [
// //                     { urls: 'stun:stun.l.google.com:19302' }
// //                 ]
// //             };
// //             peerConnection = new RTCPeerConnection(configuration);

// //             // Add local stream to peer connection
// //             localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

// //             // Event: Add remote stream to remote video element
// //             peerConnection.ontrack = function ({ streams: [remoteStream] }) {
// //                 const remoteVideo = document.getElementById('remoteVideo');
// //                 if (!remoteVideo.srcObject || remoteVideo.srcObject.id !== remoteStream.id) {
// //                     remoteVideo.srcObject = remoteStream;
// //                 }
// //             };

// //             // Event: Send ICE candidate to remote peer
// //             peerConnection.onicecandidate = function (event) {
// //                 if (event.candidate) {
// //                     sendIceCandidateToRemote(event.candidate);
// //                 }
// //             };

// //             // Start the call by creating an offer and send to remote peer
// //             peerConnection.createOffer()
// //                 .then(function (offer) {
// //                     return peerConnection.setLocalDescription(offer);
// //                 })
// //                 .then(function () {
// //                     sendOfferToRemote(peerConnection.localDescription);
// //                 })
// //                 .catch(handleGetUserMediaError);

// //         })
// //         .catch(handleGetUserMediaError);
// // }

// // // Function: Send offer to remote peer
// // function sendOfferToRemote(offer) {
// //     // Simulated function for sending offer, replace with your actual implementation
// //     receiveOfferFromRemote(offer);
// // }

// // // Function: Receive offer from remote peer
// // function receiveOfferFromRemote(offer) {
// //     // Simulated function for receiving offer, replace with your actual implementation
// //     createAnswerAndSendToRemote(offer);
// // }

// // // Function: Create answer and send to remote peer
// // function createAnswerAndSendToRemote(offer) {
// //     // Simulated function for creating answer and sending to remote, replace with your actual implementation
// //     const remoteDescription = new RTCSessionDescription(offer);
// //     peerConnection.setRemoteDescription(remoteDescription)
// //         .then(function () {
// //             return peerConnection.createAnswer();
// //         })
// //         .then(function (answer) {
// //             return peerConnection.setLocalDescription(answer);
// //         })
// //         .then(function () {
// //             sendAnswerToRemote(peerConnection.localDescription);
// //         })
// //         .catch(handleGetUserMediaError);
// // }

// // // Function: Send answer to remote peer
// // function sendAnswerToRemote(answer) {
// //     // Simulated function for sending answer, replace with your actual implementation
// //     receiveAnswerFromRemote(answer);
// // }

// // // Function: Receive answer from remote peer
// // function receiveAnswerFromRemote(answer) {
// //     // Simulated function for receiving answer, replace with your actual implementation
// //     const remoteDescription = new RTCSessionDescription(answer);
// //     peerConnection.setRemoteDescription(remoteDescription)
// //         .catch(handleGetUserMediaError);
// // }

// // // Function: Send ICE candidate to remote peer
// // function sendIceCandidateToRemote(candidate) {
// //     // Simulated function for sending ICE candidate, replace with your actual implementation
// //     receiveIceCandidateFromRemote(candidate);
// // }

// // // Function: Receive ICE candidate from remote peer
// // function receiveIceCandidateFromRemote(candidate) {
// //     // Simulated function for receiving ICE candidate, replace with your actual implementation
// //     peerConnection.addIceCandidate(candidate)
// //         .catch(handleGetUserMediaError);
// // }




// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const { v4: uuidv4 } = require('uuid');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// const PORT = process.env.PORT || 3000;

// app.use(express.static('public'));

// io.on('connection', (socket) => {
//     console.log('a user connected');

//     // Generate a unique room ID for each pair of users
//     const roomID = uuidv4();

//     // Join the room
//     socket.join(roomID);
//     console.log(`User joined room: ${roomID}`);

//     // Handle disconnect event
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//         // Notify the other user in the room about the disconnection
//         socket.to(roomID).emit('user-disconnected');
//     });

//     // Handle offer signal
//     socket.on('offer', (offer, userId) => {
//         console.log('Received offer from user:', userId);
//         // Send the offer to the other user in the room
//         socket.to(roomID).emit('offer', offer, socket.id);
//     });

//     // Handle answer signal
//     socket.on('answer', (answer) => {
//         console.log('Received answer from user:', answer);
//         // Send the answer to the other user in the room
//         socket.to(roomID).emit('answer', answer);
//     });

//     // Handle ICE candidate
//     socket.on('ice-candidate', (candidate) => {
//         console.log('Received ICE candidate from user:', candidate);
//         // Send the ICE candidate to the other user in the room
//         socket.to(roomID).emit('ice-candidate', candidate);
//     });
// });

// server.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });



// let localStream;
// let remoteStream;
// let rtcPeerConnection;

// async function startCall() {
//     const configuration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
//     rtcPeerConnection = new RTCPeerConnection(configuration);

//     // Add local stream to RTCPeerConnection
//     localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     localStream.getTracks().forEach(track => rtcPeerConnection.addTrack(track, localStream));

//     document.getElementById("localVideo").srcObject = localStream;

//     // Set up event to receive remote stream
//     rtcPeerConnection.ontrack = function(event) {
//         remoteStream = event.streams[0];
//         document.getElementById("remoteVideo").srcObject = remoteStream;
//     };

//     // Create offer and set local description
//     const offer = await rtcPeerConnection.createOffer();
//     await rtcPeerConnection.setLocalDescription(offer);

//     // Send offer to the other peer (signaling)
//     // In a real scenario, you'd use a signaling server for this purpose
// }

// function endCall() {
//     // Close peer connection and stop streams
//     rtcPeerConnection.close();
//     localStream.getTracks().forEach(track => track.stop());
//     remoteStream.getTracks().forEach(track => track.stop());
//     document.getElementById("remoteVideo").srcObject = null;
// }


// async function startCall() {
//     const configuration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
//     rtcPeerConnection = new RTCPeerConnection(configuration);

//     try {
//         // Request local media stream
//         localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

//         // Add tracks to RTCPeerConnection
//         localStream.getTracks().forEach(track => rtcPeerConnection.addTrack(track, localStream));
//         document.getElementById("localVideo").srcObject = localStream;

//         // Set up event to receive remote stream
//         rtcPeerConnection.ontrack = function(event) {
//             remoteStream = event.streams[0];
//             document.getElementById("remoteVideo").srcObject = remoteStream;
//         };

//         // Create offer and set local description
//         const offer = await rtcPeerConnection.createOffer();
//         await rtcPeerConnection.setLocalDescription(offer);

//         // Send offer to the other peer (signaling)
//         // Replace with your signaling server logic
//         // signalingChannel.send(JSON.stringify({ "offer": rtcPeerConnection.localDescription }));

//     } catch (error) {
//         if (error.name === 'NotAllowedError') {
//             alert('Access to camera and/or microphone denied. Please grant permissions.');
//         } else {
//             console.error('Error starting call:', error);
//             alert('Error starting call. Please check console for details.');
//         }
//     }
// }


let localStream;
let remoteStream;
let rtcPeerConnection;

async function startCall() {
    const configuration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
    rtcPeerConnection = new RTCPeerConnection(configuration);

    // Add local stream to RTCPeerConnection
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStream.getTracks().forEach(track => rtcPeerConnection.addTrack(track, localStream));
    document.getElementById("localVideo").srcObject = localStream;

    // Set up event to receive remote stream
    rtcPeerConnection.ontrack = function(event) {
        remoteStream = event.streams[0];
        document.getElementById("remoteVideo").srcObject = remoteStream;
    };

    // Create offer and set local description
    const offer = await rtcPeerConnection.createOffer();
    await rtcPeerConnection.setLocalDescription(offer);

    // Send offer to the other peer (signaling)
    // In a real scenario, you'd use a signaling server for this purpose
    // signalingChannel.send(JSON.stringify({ "offer": rtcPeerConnection.localDescription }));
}

function endCall() {
    // Close peer connection and stop streams
    rtcPeerConnection.close();
    localStream.getTracks().forEach(track => track.stop());
    remoteStream.getTracks().forEach(track => track.stop());
    document.getElementById("remoteVideo").srcObject = null;
}
