/* eslint-disable */

urls = $('.clearAfter.neGrid a').toArray().map(a => ({ id: a.dataset.id, url: a.href }))
names = $('.clearAfter.neGrid a span').toArray().map(span => span.innerHTML)
compoundSvgs = $('.clearAfter.neGrid a .iImgWrp img').toArray().map(img => img.src)
splitedSvgs = $('.clearAfter.neGrid a .iImgWrp .exAnim .f').toArray().map(div => div.innerHTML)

obj = urls.map(({ id, url }, index) => ({
  id,
  compound: compoundSvgs[index],
  name: names[index],
  url,
}))

JSON.stringify(obj, null, 2)

d = _.map(a, ({ code, name, image }) => {
  const ex = _.find(b, { mixed_images: image }) || _.find(c, { mixed_images: image }) || {};
  const { url } = ex;
  return { code, name, image, eng_url: url };
})

JSON.stringify(d, null, 2)
