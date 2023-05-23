// Import the necessary modules and dependencies
const request = require('supertest');
const { mockFirebase } = require('firestore-jest-mock');
const {app} = require('./server'); // Assuming you have an Express app where the controller is defined
require('./db/db.connection')

// Mock the Firebase Firestore
mockFirebase({
  database: {
    chatroom: {
      roomId: 'mocked-room-id',messages: [
        {
          sender: 'mocked-sender-id',
          content: 'Hello, world!',
          name: 'John Doe',
          profilePic: 'https://example.com/profile.jpg',
          createdAt: new Date(),
        },
      ], type: 'Group', name: 'Mocked Room', participants: ['mocked-user-id','existing-user-id','user1', 'user2', 'user3'], createdAt: new Date()
    }
  },
})

mockFirebase({
  database: {
    privateroom: {
      roomId: {
        messages: [],
      },
    },
  },
});

describe('createChatRoom', () => {
  it('should create a chat room', async () => {
    const requestBody = {
      userId: 'mocked-user-id',
      name: 'Test Room',
    };

    // Send a POST request to your createChatRoom endpoint
    const response = await request(app)
      .post('/chat/classrooms/create')
      .send(requestBody);

    // Assert the response status code and data
    expect(response.status).toBe(200);
  });

  
},10000);

describe('createChat', () => {
  it('should create a chat', async () => {
    const testtoken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwZTFkMjM5MDllNzZmZjRhNzJlZTA4ODUxOWM5M2JiOTg4ZjE4NDUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQW5rdXIgU29sYW5raSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhaLWhMZUV5aFVvdWphUFF3WGY4aGl1NGtCOU9oeFZLNlR1SlpKNz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9kZW1vcGFydC03ZTI1YiIsImF1ZCI6ImRlbW9wYXJ0LTdlMjViIiwiYXV0aF90aW1lIjoxNjg0ODM5NzgxLCJ1c2VyX2lkIjoiV3lZY2oxeFhnZldaM2lXNGJSeG51TnZwTFVGMyIsInN1YiI6Ild5WWNqMXhYZ2ZXWjNpVzRiUnhudU52cExVRjMiLCJpYXQiOjE2ODQ4Mzk3ODEsImV4cCI6MTY4NDg0MzM4MSwiZW1haWwiOiJoZXJva3VydW5uZXIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAyMDI5Njg1NTg5Mjc1NTQ5MzY3Il0sImVtYWlsIjpbImhlcm9rdXJ1bm5lcjNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.IydFWVAIn95GnfmFE20Sh-XxQ9xbGNOmA-cj0KSXTWaSJvMUHVQhUcRJMlJTXeLal1NrDwuntjr-p9eR9PcE6untbQ9fg1SvYesfsQ27kZ0_-LuEM5zXUNRsC7ycVc1vlUPusNBWtDpT4HgZ3c0d0sFbXjEv2YMPWaUI8jkibWPPLrJrHJ79XHdkmA6lMN0TBqe23IQJzghFv7Pv9IPKpwMr7kjTI5j0t0PBcMlvblC_0P1nzDNESgYn3oFr_DBuIy7yD7VBCTBtjk_9JlF6fJyYuBQVa7OFFEjWTNZaXanp-2rLc4FOqhDYLPR8A0LZZ0JEzj64IOLKVGGntRJqQw'
    const roomId = 'room-id';
    const requestBody = {
      senderId: 'sender-id',
      content: 'Hello, world!',
      name: 'Ankur',
      profilePic: 'https://example.com/profile.jpg',
    };

    // Send a POST request to your createChat endpoint
    const response = await request(app)
      .post(`/chat/chatrooms/${roomId}/chat/send`)
      .set('authorization',`Bearer ${testtoken}`)
      .send(requestBody);

    // Assert the response status code and data
    expect(response.status).toBe(201);
  });

  
},10000);

describe('fetchChatByRoomId', () => {
  it('should fetch chat messages by room ID', async () => {
    const roomId = 'mocked-room-id';
    const testtoken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwZTFkMjM5MDllNzZmZjRhNzJlZTA4ODUxOWM5M2JiOTg4ZjE4NDUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQW5rdXIgU29sYW5raSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhaLWhMZUV5aFVvdWphUFF3WGY4aGl1NGtCOU9oeFZLNlR1SlpKNz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9kZW1vcGFydC03ZTI1YiIsImF1ZCI6ImRlbW9wYXJ0LTdlMjViIiwiYXV0aF90aW1lIjoxNjg0ODM5NzgxLCJ1c2VyX2lkIjoiV3lZY2oxeFhnZldaM2lXNGJSeG51TnZwTFVGMyIsInN1YiI6Ild5WWNqMXhYZ2ZXWjNpVzRiUnhudU52cExVRjMiLCJpYXQiOjE2ODQ4Mzk3ODEsImV4cCI6MTY4NDg0MzM4MSwiZW1haWwiOiJoZXJva3VydW5uZXIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAyMDI5Njg1NTg5Mjc1NTQ5MzY3Il0sImVtYWlsIjpbImhlcm9rdXJ1bm5lcjNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.IydFWVAIn95GnfmFE20Sh-XxQ9xbGNOmA-cj0KSXTWaSJvMUHVQhUcRJMlJTXeLal1NrDwuntjr-p9eR9PcE6untbQ9fg1SvYesfsQ27kZ0_-LuEM5zXUNRsC7ycVc1vlUPusNBWtDpT4HgZ3c0d0sFbXjEv2YMPWaUI8jkibWPPLrJrHJ79XHdkmA6lMN0TBqe23IQJzghFv7Pv9IPKpwMr7kjTI5j0t0PBcMlvblC_0P1nzDNESgYn3oFr_DBuIy7yD7VBCTBtjk_9JlF6fJyYuBQVa7OFFEjWTNZaXanp-2rLc4FOqhDYLPR8A0LZZ0JEzj64IOLKVGGntRJqQw'
    
    // Send a GET request to your fetchChatByRoomId endpoint
    const response = await request(app).post(`/chat/chatrooms/${roomId}/chat`).set('authorization',`Bearer ${testtoken}`);

    // Assert the response status code and data
    expect(response.status).toBe(200);
  });
});

describe('joinChatRoom', () => {
  it('should join the chat room', async () => {
    const roomId = 'mocked-room-id';
    const testtoken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwZTFkMjM5MDllNzZmZjRhNzJlZTA4ODUxOWM5M2JiOTg4ZjE4NDUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQW5rdXIgU29sYW5raSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhaLWhMZUV5aFVvdWphUFF3WGY4aGl1NGtCOU9oeFZLNlR1SlpKNz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9kZW1vcGFydC03ZTI1YiIsImF1ZCI6ImRlbW9wYXJ0LTdlMjViIiwiYXV0aF90aW1lIjoxNjg0ODM5NzgxLCJ1c2VyX2lkIjoiV3lZY2oxeFhnZldaM2lXNGJSeG51TnZwTFVGMyIsInN1YiI6Ild5WWNqMXhYZ2ZXWjNpVzRiUnhudU52cExVRjMiLCJpYXQiOjE2ODQ4Mzk3ODEsImV4cCI6MTY4NDg0MzM4MSwiZW1haWwiOiJoZXJva3VydW5uZXIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAyMDI5Njg1NTg5Mjc1NTQ5MzY3Il0sImVtYWlsIjpbImhlcm9rdXJ1bm5lcjNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.IydFWVAIn95GnfmFE20Sh-XxQ9xbGNOmA-cj0KSXTWaSJvMUHVQhUcRJMlJTXeLal1NrDwuntjr-p9eR9PcE6untbQ9fg1SvYesfsQ27kZ0_-LuEM5zXUNRsC7ycVc1vlUPusNBWtDpT4HgZ3c0d0sFbXjEv2YMPWaUI8jkibWPPLrJrHJ79XHdkmA6lMN0TBqe23IQJzghFv7Pv9IPKpwMr7kjTI5j0t0PBcMlvblC_0P1nzDNESgYn3oFr_DBuIy7yD7VBCTBtjk_9JlF6fJyYuBQVa7OFFEjWTNZaXanp-2rLc4FOqhDYLPR8A0LZZ0JEzj64IOLKVGGntRJqQw'
    
    const requestBody = {
      userId: 'mocked-user-id',
    };

    // Send a POST request to your joinChatRoom endpoint
    const response = await request(app)
      .post(`/chat/chatrooms/${roomId}/join`)
      .set('authorization',`Bearer ${testtoken}`)
      .send(requestBody);

    // Assert the response status code and data
    expect(response.status).toBe(200);
  });

 
});

describe('leaveChatRoom', () => {
  it('should leave the chat room', async () => {
    const roomId = 'mocked-room-id';
    const requestBody = {
      userId: 'user2',
    };
    const testtoken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwZTFkMjM5MDllNzZmZjRhNzJlZTA4ODUxOWM5M2JiOTg4ZjE4NDUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQW5rdXIgU29sYW5raSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhaLWhMZUV5aFVvdWphUFF3WGY4aGl1NGtCOU9oeFZLNlR1SlpKNz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9kZW1vcGFydC03ZTI1YiIsImF1ZCI6ImRlbW9wYXJ0LTdlMjViIiwiYXV0aF90aW1lIjoxNjg0ODM5NzgxLCJ1c2VyX2lkIjoiV3lZY2oxeFhnZldaM2lXNGJSeG51TnZwTFVGMyIsInN1YiI6Ild5WWNqMXhYZ2ZXWjNpVzRiUnhudU52cExVRjMiLCJpYXQiOjE2ODQ4Mzk3ODEsImV4cCI6MTY4NDg0MzM4MSwiZW1haWwiOiJoZXJva3VydW5uZXIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAyMDI5Njg1NTg5Mjc1NTQ5MzY3Il0sImVtYWlsIjpbImhlcm9rdXJ1bm5lcjNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.IydFWVAIn95GnfmFE20Sh-XxQ9xbGNOmA-cj0KSXTWaSJvMUHVQhUcRJMlJTXeLal1NrDwuntjr-p9eR9PcE6untbQ9fg1SvYesfsQ27kZ0_-LuEM5zXUNRsC7ycVc1vlUPusNBWtDpT4HgZ3c0d0sFbXjEv2YMPWaUI8jkibWPPLrJrHJ79XHdkmA6lMN0TBqe23IQJzghFv7Pv9IPKpwMr7kjTI5j0t0PBcMlvblC_0P1nzDNESgYn3oFr_DBuIy7yD7VBCTBtjk_9JlF6fJyYuBQVa7OFFEjWTNZaXanp-2rLc4FOqhDYLPR8A0LZZ0JEzj64IOLKVGGntRJqQw'
    
    // Send a POST request to your leaveChatRoom endpoint
    const response = await request(app)
      .post(`/chat/chatrooms/${roomId}/leave`)
      .set('authorization',`Bearer ${testtoken}`)
      .send(requestBody);

    // Assert the response status code and data
    expect(response.status).toBe(200);
  });

  
});

describe('sendPrivateChat', () => {
  it('should send a private chat message', async () => {
    const roomId = 'mocked-room-id';
    const requestBody = {
      senderId: 'user1',
      content: 'Hello, user2!',
      profilePic: 'user1-profile-pic.jpg',
      name: 'User 1',
    };
    const testtoken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwZTFkMjM5MDllNzZmZjRhNzJlZTA4ODUxOWM5M2JiOTg4ZjE4NDUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQW5rdXIgU29sYW5raSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhaLWhMZUV5aFVvdWphUFF3WGY4aGl1NGtCOU9oeFZLNlR1SlpKNz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9kZW1vcGFydC03ZTI1YiIsImF1ZCI6ImRlbW9wYXJ0LTdlMjViIiwiYXV0aF90aW1lIjoxNjg0ODM5NzgxLCJ1c2VyX2lkIjoiV3lZY2oxeFhnZldaM2lXNGJSeG51TnZwTFVGMyIsInN1YiI6Ild5WWNqMXhYZ2ZXWjNpVzRiUnhudU52cExVRjMiLCJpYXQiOjE2ODQ4Mzk3ODEsImV4cCI6MTY4NDg0MzM4MSwiZW1haWwiOiJoZXJva3VydW5uZXIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAyMDI5Njg1NTg5Mjc1NTQ5MzY3Il0sImVtYWlsIjpbImhlcm9rdXJ1bm5lcjNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.IydFWVAIn95GnfmFE20Sh-XxQ9xbGNOmA-cj0KSXTWaSJvMUHVQhUcRJMlJTXeLal1NrDwuntjr-p9eR9PcE6untbQ9fg1SvYesfsQ27kZ0_-LuEM5zXUNRsC7ycVc1vlUPusNBWtDpT4HgZ3c0d0sFbXjEv2YMPWaUI8jkibWPPLrJrHJ79XHdkmA6lMN0TBqe23IQJzghFv7Pv9IPKpwMr7kjTI5j0t0PBcMlvblC_0P1nzDNESgYn3oFr_DBuIy7yD7VBCTBtjk_9JlF6fJyYuBQVa7OFFEjWTNZaXanp-2rLc4FOqhDYLPR8A0LZZ0JEzj64IOLKVGGntRJqQw'


    // Send a POST request to your sendPrivateChat endpoint
    const response = await request(app)
      .post(`/chat/${roomId}/private/send`)
      .set('authorization',`Bearer ${testtoken}`)
      .send(requestBody);

    // Assert the response status code and data
    expect(response.status).toBe(201);
  });

})