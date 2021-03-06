// ==UserScript==
// @name         youtube live comment convert
// @namespace    https://github.com/coh-rogi/custom_script
// @version      0.1
// @description  外国語コメントを日本語に翻訳
// @author       coh-rogi
// @match        https://www.youtube.com/live_chat?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
  let mutationObserver = new MutationObserver(function() {
    if (document.querySelector("#item-scroller #items").childNodes.length) {
      // コメントが追加された時に動作
      var element = document.querySelector("#item-scroller #items").childNodes[document.querySelector("#item-scroller #items").childNodes.length-1].querySelector("#message");

      // スタンプのみのコメントを除外
      if(element.innerText){
        // 翻訳APIへリクエスト
        var param = encodeURI(element.innerText);
        fetch("https://script.google.com/macros/s/AKfycbzU8mU59MnDvhgnOyCVQITJiLgDztcaElh7zxBXgzOAMUfNx0JZ5xbbXzMIDXFd_cQL/exec?text=" + param, {
          method: "GET",
          redirect: 'follow'
        }).then(response => response.text())
        .then(text => {
          var honyaku = JSON.parse(text).text;
          console.log(honyaku);
          if(element.innerText != honyaku){
            // 翻訳結果を追加
            element.innerHTML += "<br>訳：" + honyaku;
          }
        });
      }
    }
  });

  // 要素の追加を監視
  mutationObserver.observe(
    document.querySelector("#item-scroller #items"),
    {
      childList: true
    }
  );
})();
