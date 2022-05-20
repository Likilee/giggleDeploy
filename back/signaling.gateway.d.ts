import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
interface OfferAnswerDto {
    fromClientId: string;
    toClientId: string;
    sdp: RTCSessionDescriptionInit;
}
interface IceDto {
    fromClientId: string;
    toClientId: string;
    ice: RTCIceCandidate;
}
export declare class SignalingGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    roomMap: Map<string, string>;
    constructor();
    handleJoinRoom(client: Socket, roomId: string): void;
    handleOffer(offerDto: OfferAnswerDto): void;
    handleAnswer(answerDto: OfferAnswerDto): void;
    handleIce(iceDto: IceDto): void;
    afterInit(): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
}
export {};
