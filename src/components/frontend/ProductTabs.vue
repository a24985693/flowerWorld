<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <button class="nav-link" @click="tabs = 'productIntro'"
        :class="{ active: tabs==='productIntro' }"
        type="button">
        購買說明
    </button>
    </li>
    <li class="nav-item">
      <button class="nav-link" @click="tabs = 'commonQA'"
        :class="{ active: tabs==='commonQA' }"
        type="button">
        常見問題
      </button>
      </li>
    </ul>
  <div v-if="tabs === 'productIntro'" class="py-5">
    <div class="row justify-content-center">
      <div class="col">
        <ul>
          <li class="mb-3">單件商品最多購買數量為20</li>
          <li class="mb-3">如當季節花材有短缺狀況，另會以相近顏色花材做設計。
            若有缺貨之花材會提前與顧客討論。
          </li>
          <li class="mb-3">可依據顧客需求，更改數量及顏色的需求。</li>
          <li class="mb-3">客製化與急件請先與我們聯絡詢問</li>
          <li class="mb-3">提供行動支付、銀行ATM、信用卡</li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else class="py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8">
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button" type="button"
                data-bs-toggle="collapse" data-bs-target="#collapseOne"
                aria-expanded="true" aria-controls="collapseOne">
                鮮花與乾燥花差別在哪?
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse"
              aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <strong>鮮花</strong>
                <p>具有自然的顏色和質感，花瓣柔軟，散發著自然的香氣。</p>
                <strong>乾燥花</strong>
                <p>經過脫水處理，顏色會有所變化，通常顏色較為暗淡或褪色，但仍然保留了花的形狀。
                  乾燥花的質感較為脆弱，沒有鮮花的柔軟感。</p>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button" type="button"
                data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                aria-expanded="true" aria-controls="collapseTwo">
                拿到商品該如何照顧?
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse"
              aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <strong>鮮花</strong>
                <p>最佳觀賞期為3~5天，需要每日換水以免細菌孳生、修剪花莖，並放置在適當的環境中（避免陽光直射和高溫）</p>
                <strong>乾燥花</strong>
                <ul>
                  <li>正常保存可保存1~2年左右。</li>
                  <li>需避免放置在潮濕及太陽曝曬的環境中。</li>
                  <li>有灰塵時，用刷子輕輕刷掉即可。</li>
                  <li>質地較脆，避免去擠壓到。</li>
                  <li>避免接觸水與精油、香水等腐蝕性溶劑</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button" type="button"
                data-bs-toggle="collapse" data-bs-target="#collapseThree"
                aria-expanded="true" aria-controls="collapseThree">
                下單後多久會到貨?
              </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse"
              aria-labelledby="headingThree" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <p>一般為下單後3~7天，建議提前一星期下單，下單前可以先與我們聯繫做確認。</p>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingFour">
              <button class="accordion-button" type="button"
                data-bs-toggle="collapse" data-bs-target="#collapseFour"
                aria-expanded="true" aria-controls="collapseFour">
                有接單日急單嗎?
              </button>
            </h2>
            <div id="collapseFour" class="accordion-collapse collapse"
              aria-labelledby="headingFour" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <p>在送花前24小時為急單，可以先與我們聯繫討論。</p>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingSix">
              <button class="accordion-button" type="button"
                data-bs-toggle="collapse" data-bs-target="#collapseSix"
                aria-expanded="true" aria-controls="collapseSix">
                花束包裝可以換花瓶嗎?
              </button>
            </h2>
            <div id="collapseSix" class="accordion-collapse collapse"
              aria-labelledby="headingSix" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                大部分商品都是可以做替換的，也是歡迎與我們聯絡討論。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse';

export default {
  data() {
    return {
      tabs: 'productIntro',
      collapse: {},
    };
  },
  mounted() {
    const collapseElementList = [].slice.call(document.querySelectorAll('.accordion-collapse'));
    this.collapse = collapseElementList.map((collapseEl) => new Collapse(collapseEl));
  },
};
</script>
