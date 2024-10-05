<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <img src="../assets/logo1.png" alt="Logo" class="logo" />
    </div>

    <ul class="nav flex-column">
      <li>
        <a class="nav-link" href="/manager/home">
          <img src="../assets/logo.png" alt="Dashboard" class="icon" />
          Dashboard
        </a>
      </li>
      <li>
        <a class="nav-link" href="/manager/employee/create">
          <img src="../assets/logo.png" alt="Components" class="icon" />
          Components
        </a>
      </li>
      <li>
        <a class="nav-link" href="/icons">
          <img src="../assets/logo.png" alt="Icons" class="icon" />
          Icons
        </a>
      </li>
      <li>
        <a class="nav-link" href="/widgets">
          <img src="../assets/logo.png" alt="Widgets" class="icon" />
          Widgets
        </a>
      </li>
      <li>
        <a class="nav-link" href="/charts">
          <img src="../assets/logo.png" alt="Charts" class="icon" />
          Charts
        </a>
      </li>
      <li>
        <a class="nav-link" href="/pages">
          <img src="../assets/logo.png" alt="Pages" class="icon" />
          Pages
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #2e3b4e;
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
