<template>
  <div>



    <!-- 메인 컨테이너 -->
    <div class="container-fluid">
      <div class="row">
        <!-- 사이드바 -->


        <!-- 컨텐츠 영역 -->
        <div class="col-md-9">
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
                <FindCommute/>
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
import FindCommute from "@/components/DashBoard/FindCommute.vue";

</script>

<style>
.container {
  max-width: 120px;
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