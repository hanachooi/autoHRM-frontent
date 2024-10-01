<template>
  <div>
    <!-- 헤더바 -->
    <nav class="navbar navbar-expand-lg navbar-light bg-dark m-0">
      <a class="navbar-brand ms-auto p-2 text-white" href="#">Jassa Admin</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item p-2">
            <a class="nav-link text-secondary" href="#">Profile</a>
          </li>
          <li class="nav-item p-2">
            <a class="nav-link text-secondary" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </nav>



    <!-- 메인 컨테이너 -->
    <div class="container-fluid">
      <div class="row">
        <!-- 사이드바 -->
        <div class="col-md-1 bg-secondary vh-100">
          <ul class="nav flex-column mt-4">
            <a class="nav-link text-white" href="#">
              <img src="../assets/dashboard.png" alt="Dashboard" />
              dashboard
            </a>
            <a class="nav-link text-white" href="#">
              <img src="../assets/apply.png" alt="Apply" />
              apply
            </a>
            <a class="nav-link text-white" href="#">
              <img src="../assets/apply.png" alt="Apply" />
              alert
            </a>
            <a class="nav-link text-white" href="#">
              <img src="../assets/apply.png" alt="Apply" />
              ddd
            </a>
          </ul>
        </div>

        <!-- 컨텐츠 영역 -->
        <div class="col-md-10">
          <div class="container mt-4">
            <div class="row">
              <!-- 왼쪽 카드 -->
              <div class="col-md-6">
                <div class="card">
                  <CheckInStatus/>
                </div>
              </div>
              <!-- 오른쪽 카드 -->
              <div class="col-md-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Vuejs</h5>
                    <p class="card-text">
                      Jassa<br />
                      You can also try different version of Bootstrap V4 side menu. Click below link to view all Bootstrap Menu versions.
                    </p>
                    <a href="#" class="card-link">Link</a>
                    <a href="#" class="card-link">Another link</a>
                  </div>
                </div>
              </div>
            </div>

            <!-- 테이블 -->
            <div class="row mt-4">
              <div class="col-md-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <table class="table">
                      <thead>
                      <tr>
                        <th>#</th>
                        <th>First</th>
                        <th>Last</th>
                        <th>Handle</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <table class="table">
                      <thead>
                      <tr>
                        <th>#</th>
                        <th>First</th>
                        <th>Last</th>
                        <th>Handle</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import CheckInStatus from "@/components/DashBoard/CheckInStatus.vue";

</script>

<style>
.container {
  max-width: 1200px;
}
.card {
  margin-bottom: 20px;
}
.vh-100 {
  height: 100vh;
}
.nav-link {
  padding: 10px 15px;
}
.navbar {
  margin-bottom: 20px;
}
</style>