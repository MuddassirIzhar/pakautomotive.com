"use client";
import { reducerCases } from "./constants";
import { Room } from 'next-auth';

export const initialState = {
    userInfo:undefined,
    onlineUsers:[],
    messages:[],
    socket:undefined,
    messagesSearch:false,
    rooms:[],
    roomsSearch:[],
    // roomsSearch:false,
    currentRoom:undefined,
    currentRoomId:undefined,
    totalUnreadMessages:0,
}

const reducer = (state: any, action: any) => {
    switch(action.type){
        case reducerCases.SET_SOCKET:
            return {
                ...state,
                socket: action.socket,
            };
        case reducerCases.SET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: action.onlineUsers,
            };
        case reducerCases.SET_MESSAGES:
            return {
                ...state,
                messages: action.messages,
            };
        case reducerCases.ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages,action.newMessage],
            };
        case reducerCases.SET_MESSAGE_SEARCH:
            return {
                ...state,
                messagesSearch: !state.messagesSearch,
            };
        case reducerCases.SET_ROOMS:
            return {
                ...state,
                rooms: action.rooms,
            };
        case reducerCases.ADD_ROOM:
            return {
                ...state,
                rooms: [...state.rooms,action.newRoom],
            };
        case reducerCases.SET_ROOM_SEARCH:
            return {
                ...state,
                roomsSearch: action.roomsSearch,
                // roomsSearch: !state.roomsSearch,
            };
        case reducerCases.SET_CURRENT_ROOM:
            return {
                ...state,
                currentRoom: action.currentRoom,
            };
        case reducerCases.SET_CURRENT_ROOM_ID:
            return {
                ...state,
                currentRoomId: action.currentRoomId,
            };
        case reducerCases.SET_TOTAL_UNREAD_MESSAGES:
            return {
                ...state,
                totalUnreadMessages: action.totalUnreadMessages,
            };
        default:
            return state;
    }
}

export default reducer;