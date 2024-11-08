<template>
  <header class="header">
    <div class="header-left">
      <img src="../../assets/logo.png" alt="Logo" class="logo" />
      <nav class="nav-menu">
        <a href="/dashboard" class="nav-link">회사</a>
        <a href="/users" class="nav-link">관리자</a>
        <a href="/settings" class="nav-link">계정입니다.</a>
      </nav>
    </div>

    <div class="header-right">
      <img src="../../assets/logo.png" alt="Notifications" class="icon" />
      <img src="../../assets/logo.png" alt="User Profile" class="user-icon" />
      <span class="username">admin</span>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
}

.header-left {
  display: flex;
  align-items: center;
}

.nav-menu {
  display: flex;
  gap: 15px;
}

.nav-link {
  color: #5a5a5a;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
}

.nav-link:hover {
  color: #007bff;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.user-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #ccc;
}

.username {
  font-size: 16px;
  font-weight: 500;
  color: #5a5a5a;
}

.logo {
  width: 50px; /* 이미지 너비를 적절히 제한 */
  height: 50px;
  display: block;
  margin-right: 20px;
}

</style>
