import { App, H, Img, Span, Button, Br, Nbsp } from 'https://unpkg.com/flub.js/dist/core.js';
import { Row, Btn, Text, Link, Column, Box, ManagedForm, TextInput } from 'https://unpkg.com/flub.js/dist/components.js';

const flubGithub = 'https://github.com/lkuich/flub.js';

App(document.body, { children: [
  Span({ class: 'fork-me', children: [
    Link('Try Flub.js on GitHub!', flubGithub, { target: '_blank' }),
  ]}),
  Main
]});

function flickrSearch({ flickrApiKey, search }) {
  return fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrApiKey}&tags=${search}&format=json&nojsoncallback=1`)
    .then(res => res.json())
    .then(res => res.photos.photo.map(photo => `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`))
}

function Main({ search }, { setState }) {
  return Column([
    Column([
      Box([
        H({ h: 1, text: "SnapShot in", children: [
          Nbsp(),
          Link('flub.js', flubGithub, { target: '_blank' })
        ]})
      ]),
      Row([
        Span({ text: "Based off of: ", children: [
          Nbsp(),
          Link('SnapShot React', 'https://github.com/Yog9/SnapShot', { target: '_blank' })
        ]})
      ]),

      Br()
    ], { alignItems: 'center' }),

    ManagedForm({
      name: 'search-form',
      class: 'search-form',
      children: [
        Button({ text: "Search", type: 'submit' })
      ]
    }, {
      fields: [
        TextInput({ name: 'search', placeholder: 'Search', class: 'search-input' })
      ],
      onSubmit: (e, formData) => setState(formData)
    }),

    RecommendedSearches(setState),

    (_, hooks) => SearchResults({ ..._, search }, hooks)
  ], { alignItems: 'center' });
}

function RecommendedSearches(setSearch) {
  return Row([
    Btn('Mountains', () => setSearch({ search: 'mountains' })),
    Btn('Beaches', () => setSearch({ search: 'beaches' })),
    Btn('Birds', () => setSearch({ search: 'birds' })),
    Btn('Food', () => setSearch({ search: 'food' }))
  ], { gap: '12px' });
}

function SearchResults({ search = 'mountains', images = [] }, { setState, useCreation }) {
  useCreation(async () => {
    if (search) {
      const images = await flickrSearch({ flickrApiKey: '636e1481b4f3c446d26b8eb6ebfe7127', search: search.toLowerCase() })
      setState({ images });
    }
  });

  return Column([
    search && Text(`${search} Images`, { type: 'h2' }),
    Box(images.map(src =>
      Box(
        Link(Img({ src }), src, { target: '_blank' })
      )
    ), { class: 'grid' }),
    images.length === 0 && Text('No images found', { type: 'h3' })
  ], { gap: '12px', alignItems: 'center' });
}
