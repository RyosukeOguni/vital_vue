<template>
  <main class="container">
    <article class="user_show row justify-content-center">
      <section class="mt-4 col-md-12">
        <h2 class="border-bottom border-secondary pb-2 mb-3">利用者一覧(全000件)</h2>
        <ul class="list-unstyled d-flex">
          <li class="border-secondary pr-3">
            <button type="button" class="btn btn-primary fs14"><router-link to="/user_input">利用者登録 </router-link></button>
          </li>
        </ul>
        <table class="table table-hover table-striped mt-3 fs14">
          <thead>
            <tr>
              <th class="border-top-0 text-center"><button type="button" class="btn py-1 px-2 btn-danger fs14">削除</button></th>
              <th class="border-top-0">ID</th>
              <th class="border-top-0">名前</th>
              <th class="border-top-0">年齢</th>
              <th class="border-top-0">性別</th>
              <th class="border-top-0">診断名</th>
              <th class="border-top-0">登録日時</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center">
                <div class="form-check text-center"><input type="checkbox" class="form-check-input position-static" /></div>
              </td>
              <td>1</td>
              <td>山田太郎</td>
              <td>8</td>
              <td>男</td>
              <td>脳性まひ</td>
              <td>2020/10/06 15:00</td>
            </tr>
            <tr>
              <td class="text-center">
                <div class="form-check text-center"><input type="checkbox" class="form-check-input position-static" /></div>
              </td>
              <td>2</td>
              <td>山田花子</td>
              <td>7</td>
              <td>女</td>
              <td>脳性まひ</td>
              <td>2020/10/06 15:00</td>
            </tr>
            <tr>
              <td class="text-center">
                <div class="form-check text-center"><input type="checkbox" class="form-check-input position-static" /></div>
              </td>
              <td>3</td>
              <td>鈴木一郎</td>
              <td>6</td>
              <td>男</td>
              <td>脳性まひ</td>
              <td>2020/10/06 15:00</td>
            </tr>
            <tr>
              <td class="text-center">
                <div class="form-check text-center"><input type="checkbox" class="form-check-input position-static" /></div>
              </td>
              <td>4</td>
              <td>田中太郎</td>
              <td>5</td>
              <td>男</td>
              <td>脳性まひ</td>
              <td>2020/10/06 15:00</td>
            </tr>
            <tr>
              <td class="text-center">
                <div class="form-check text-center"><input type="checkbox" class="form-check-input position-static" /></div>
              </td>
              <td>5</td>
              <td>佐々木小次郎</td>
              <td>4</td>
              <td>男</td>
              <td>脳性まひ</td>
              <td>2020/10/06 15:00</td>
            </tr>
          </tbody>
        </table>
        <nav aria-label="Page navigation example" class="d-flex justify-content-center">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </section>
    </article>
  </main>
</template>
<script>
export default {
  name: 'User',
}
</script>
