// utils/auth.js

// JWT 토큰 디코딩 함수
export function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Failed to parse JWT:', error);
        return null;
    }
}

// 헤더에서 JWT 토큰을 가져오는 함수
export function getTokenFromHeader() {
    const token = localStorage.getItem('token');
    if (token) {
        return token.replace('Bearer ', '');
    }
    console.warn('JWT token not found in headers');
    return null;
}

// 토큰의 만료 여부를 확인하는 함수
export function isTokenExpired(token) {
    const decoded = parseJwt(token);
    if (!decoded || !decoded.exp) {
        console.warn('Invalid JWT or expiration time not found');
        return true; // 만료된 것으로 처리
    }
    const currentTime = Math.floor(Date.now() / 1000); // 현재 시간(UTC)을 초 단위로 변환
    return decoded.exp < currentTime;
}

