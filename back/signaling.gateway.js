"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalingGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let SignalingGateway = class SignalingGateway {
    constructor() {
        this.roomMap = new Map();
    }
    handleJoinRoom(client, roomId) {
        client.join(roomId);
        console.log(`${client.id} join room : ${roomId}`);
        this.roomMap.set(client.id, roomId);
        const clientIdsInRoom = this.server.sockets.adapter.rooms.get(roomId);
        if (clientIdsInRoom.size > 1) {
            client.emit('needToOffer', Array.from(clientIdsInRoom));
        }
    }
    handleOffer(offerDto) {
        const clientSocket = this.server.sockets.sockets.get(offerDto.toClientId);
        if (clientSocket) {
            console.log(`from ${offerDto.fromClientId} to ${offerDto.toClientId} offer send`);
            clientSocket.emit('offer', offerDto);
        }
    }
    handleAnswer(answerDto) {
        const clientSocket = this.server.sockets.sockets.get(answerDto.toClientId);
        if (clientSocket) {
            console.log(`from ${answerDto.fromClientId} to ${answerDto.toClientId} answer send`);
            clientSocket.emit('answer', answerDto);
        }
    }
    handleIce(iceDto) {
        const clientSocket = this.server.sockets.sockets.get(iceDto.toClientId);
        if (clientSocket) {
            console.log(`from ${iceDto.fromClientId} to ${iceDto.toClientId} ice send`);
            clientSocket.emit('ice', iceDto);
        }
    }
    afterInit() {
        console.log('Gateway init!');
    }
    handleConnection(client) {
        console.log(`client connected ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`client disconnected ${client.id}`);
        client.broadcast
            .to(this.roomMap.get(client.id))
            .emit('exitRoom', client.id);
        this.roomMap.delete(client.id);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SignalingGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], SignalingGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('offer'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SignalingGateway.prototype, "handleOffer", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('answer'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SignalingGateway.prototype, "handleAnswer", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('ice'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SignalingGateway.prototype, "handleIce", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], SignalingGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], SignalingGateway.prototype, "handleDisconnect", null);
SignalingGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    }),
    __metadata("design:paramtypes", [])
], SignalingGateway);
exports.SignalingGateway = SignalingGateway;
//# sourceMappingURL=signaling.gateway.js.map