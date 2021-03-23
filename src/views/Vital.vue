<template>
  <main class="container">
    <article class="vital_menu row justify-content-center">
      <section class="mt-4 col-md-10">
        <h2 class="border-bottom border-secondary pb-2 mb-3">バイタル登録</h2>
        <ul class="list-unstyled d-flex">
          <li class="border-secondary pr-3" style="border-right: 1px dotted">
            <button type="button" class="btn btn-primary fs14">バイタル新規登録</button>
          </li>
          <li class="ml-3">
            <button type="button" class="btn btn-outline-secondary fs14">バイタル一覧表示／編集</button>
          </li>
        </ul>
      </section>
      <section class="mt-4 col-md-10">
        <h2 class="border-bottom border-secondary pb-2 mb-3">気候情報</h2>
        <p>本日は<u class="mx-2 font-weight-bold fs18"></u>です。</p>
        <div class="row">
          <dl class="col-6 col-sm-4 col-md-15">
            <dt class="font-weight-normal d-inline-block">天　候：</dt>
            <dd class="d-inline-block"><u class="font-weight-bold fs18"></u></dd>
          </dl>
          <dl class="col-6 col-sm-4 col-md-15">
            <dt class="font-weight-normal d-inline-block">外気温：</dt>
            <dd class="d-inline-block"><u class="font-weight-bold fs18"></u></dd>
          </dl>
          <dl class="col-6 col-sm-4 col-md-15">
            <dt class="font-weight-normal d-inline-block">内気温：</dt>
            <dd class="d-inline-block"><u class="font-weight-bold fs18"></u></dd>
          </dl>
          <dl class="col-6 col-sm-4 col-md-15">
            <dt class="font-weight-normal d-inline-block">外湿度：</dt>
            <dd class="d-inline-block"><u class="font-weight-bold fs18"></u></dd>
          </dl>
          <dl class="col-6 col-sm-4 col-md-15">
            <dt class="font-weight-normal d-inline">内湿度：</dt>
            <dd class="d-inline-block"><u class="font-weight-bold fs18"></u></dd>
          </dl>
        </div>
      </section>
    </article>
    <!-- Modal -->
    <div class="modal fade" id="weatherModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="weatherModalLabel">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="row">
              <p class="col-md-12">本日は<u class="mx-2 font-weight-bold fs18">2020年07月24日(金)</u>です。</p>
              <dl class="col-md-4">
                <dt class="font-weight-normal d-inline-block">天　候：</dt>
                <dd class="d-inline-block"><u class="font-weight-bold fs18">晴れ</u></dd>
              </dl>
              <dl class="col-md-4">
                <dt class="font-weight-normal d-inline-block">外気温：</dt>
                <dd class="d-inline-block"><u class="font-weight-bold fs18">31.0℃</u></dd>
              </dl>
              <dl class="col-md-4">
                <dt class="font-weight-normal d-inline-block">外湿度：</dt>
                <dd class="d-inline-block"><u class="font-weight-bold fs18">70％</u></dd>
              </dl>
            </div>
            <ul class="row list-unstyled">
              <li class="col-md-6">
                <label class="text-field">
                  <span class="text-field-label">内気温(℃)</span>
                  <input class="text-field-input" type="number" name="room_temp" />
                </label>
              </li>
              <li class="col-md-6">
                <label class="text-field">
                  <span class="text-field-label">内湿度(％)</span>
                  <input class="text-field-input" type="number" name="room_humidity" />
                </label>
              </li>
            </ul>
            <div class="text-right">
              <button type="button" class="btn btn-secondary fs14">戻る</button>
              <button type="button" class="btn btn-primary fs14" data-dismiss="modal" aria-label="Close">登録</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Vital',
}
</script>
