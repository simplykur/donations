// loads gamepasses.json and renders the donation cards. everything displayed
// comes straight from that json (no roblox api calls, so no CORS headaches)
// edit gamepasses.json to change the heading or add/remove passes.
(function () {
  'use strict'

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]
    })
  }

  function card(gp) {
    const id = String(gp.id || '').replace(/\D/g, '')
    const url = gp.url || (id ? 'https://www.roblox.com/game-pass/' + id + '/' : '#')
    const el = document.createElement('div')
    el.className = 'card'
    const thumb = gp.image
      ? '<div class="card-thumb" style="background-image:url(' + esc(gp.image) + ')"></div>'
      : '<div class="card-thumb">🎁</div>'
    const price = (gp.price != null && gp.price !== '')
      ? '<div class="card-price"><span class="rbx">R$</span>' + esc(gp.price) + '</div>'
      : '<div class="card-price"><span class="rbx">R$</span>any</div>'
    el.innerHTML =
      thumb +
      '<div class="card-body">' +
        '<div class="card-name">' + esc(gp.name || ('game pass ' + id)) + '</div>' +
        price +
        '<a class="card-cta" href="' + esc(url) + '" target="_blank" rel="noopener">donate</a>' +
      '</div>'
    return el
  }

  async function main() {
    let cfg = {}
    try {
      const res = await fetch('gamepasses.json', { cache: 'no-store' })
      cfg = await res.json()
    } catch (e) {
      cfg = {}
    }
    if (cfg.title) document.getElementById('hero-title').textContent = cfg.title
    if (cfg.subtitle) document.getElementById('hero-sub').textContent = cfg.subtitle
    if (cfg.badge) document.getElementById('hero-badge').textContent = cfg.badge
    if (cfg.footer) document.getElementById('foot-text').textContent = cfg.footer
    if (cfg.title) document.title = cfg.title

    const list = Array.isArray(cfg.gamepasses) ? cfg.gamepasses : []
    const grid = document.getElementById('grid')
    const empty = document.getElementById('empty')
    if (!list.length) { empty.hidden = false; return }
    list.forEach(function (gp, i) {
      const c = card(gp)
      c.style.animationDelay = (i * 60) + 'ms'
      grid.appendChild(c)
    })
  }

  main()
})()
