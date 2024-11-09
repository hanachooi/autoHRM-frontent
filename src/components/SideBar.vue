<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h2>AHM COMPANY.</h2>
    </div>

    <ul class="nav flex-column">
      <li>
        <a class="nav-link" href="/manager/home">
          <img src="../assets/logo.png" alt="사원관리" class="icon" />
          사원정보관리
        </a>
      </li>
      <li>
        <a class="nav-link" href="/manager/employee/create">
          <img src="../assets/logo.png" alt="Components" class="icon" />
          신규사원등록
        </a>
      </li>
      <li>
        <a class="nav-link" href="/manager/commutes">
          <img src="../assets/logo.png" alt="Icons" class="icon" />
          사원출퇴근관리
        </a>
      </li>
      <li>
        <a class="nav-link" href="/manager/applies">
          <img src="../assets/logo.png" alt="Widgets" class="icon" />
          외근/휴가/정정 관리
        </a>
      </li>
      <li>
        <a class="nav-link" href="/manager/salaries">
          <img src="../assets/logo.png" alt="Charts" class="icon" />
          월급관리
        </a>
      </li>
      <li>
        <a class="nav-link" href="/pages">
          <img src="../assets/logo.png" alt="Pages" class="icon" />
          지원
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>

@font-face {
  font-family: 'Bold';
  src: url('../assets/NEXONLv1GothicBold.ttf') format('truetype');
  font-weight: 700;
}

h2{
  font-family: 'Bold', sans-serif;
}


.sidebar {
  width: 250px;
  background-color: #141464;
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
}

.sidebar-header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.logo {
  height: 40px;
}

.nav {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: white;
  text-decoration: none;
  font-size: 16px;
  position: relative;
}

.nav-link:hover {
  background-color: #1e2a38;
}

.icon {
  margin-right: 10px;
  width: 20px;
  height: 20px;
}

.badge {
  background-color: #007bff;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 12px;
  margin-left: auto;
}

.flex-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
