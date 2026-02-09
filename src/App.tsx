import {
  AppBar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  InputBase,
  Stack,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useRef } from 'react'

const featured = [
  {
    name: 'Auriculares Aura',
    price: 125,
    oldPrice: 155,
    discount: 30,
    desc: 'Sonido inmersivo y diseno premium.',
    image:
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Teclado Linea',
    price: 99,
    oldPrice: 129,
    discount: 30,
    desc: 'Perfil bajo y tacto suave.',
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
  },
]

const offers = [
  {
    name: 'Luz Ambito',
    price: 79,
    oldPrice: 119,
    discount: 30,
    desc: 'Iluminacion suave para tu espacio.',
    image:
      'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Mouse Pulse',
    price: 59,
    oldPrice: 89,
    discount: 30,
    desc: 'Preciso y comodo para el dia a dia.',
    image:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Monitor Flux',
    price: 219,
    oldPrice: 259,
    discount: 30,
    desc: 'Colores limpios y bordes finos.',
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Silla Axis',
    price: 189,
    oldPrice: 229,
    discount: 30,
    desc: 'Comodidad para sesiones largas.',
    image:
      'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=900&q=80',
  },
]

function App() {

  const featuredRef = useRef<HTMLDivElement | null>(null)

  const scrollFeatured = (direction: 'left' | 'right') => {
    if (!featuredRef.current) return
    const amount = direction === 'left' ? -320 : 320
    featuredRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" color="transparent" elevation={0}>
        <Container>
          <Toolbar sx={{ gap: 3 }}>
            <Typography variant="h6" fontWeight={700}>
              SteamShop
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#101823',
                px: 2,
                py: 0.5,
                borderRadius: 999,
                flex: 1,
                maxWidth: 520,
              }}
            >
              <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <InputBase
                placeholder="Buscar productos, marcas, categorias"
                sx={{ color: 'text.primary', flex: 1 }}
              />
            </Box>

            <Stack direction="row" spacing={2}>
              <Button color="inherit">Biblioteca</Button>
              <Button color="inherit">Wishlists</Button>
              <Badge color="secondary" badgeContent={2}>
                <Button variant="contained" color="secondary">
                  Carrito
                </Button>
              </Badge>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Stack direction="row" spacing={4} sx={{ flexWrap: 'wrap' }}>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  Categorias
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
                  {['Audio', 'Workspace', 'Movilidad', 'Streaming', 'Accesorios'].map((cat) => (
                    <Button key={cat} color="inherit" size="small">
                      {cat}
                    </Button>
                  ))}
                </Stack>
              </Box>

            </Stack>
          </Grid>

          <Grid item xs={12} md={9}>
            {/* Banner grande */}
            <Card sx={{ mb: 3, overflow: 'hidden' }}>
              <Grid container>
                <Grid item xs={12} md={7}>
                  <Box
                    component="img"
                    src={featured[0].image}
                    alt={featured[0].name}
                    sx={{ width: '100%', height: 320, objectFit: 'cover' }}
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="overline" color="secondary">
                      Oferta destacada
                    </Typography>
                    <Typography variant="h4">{featured[0].name}</Typography>
                    <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 420 }}>
                      Audio balanceado, materiales premium y descuento limitado por tiempo corto.
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
                      <Typography variant="h5" color="secondary">
                        ${featured[0].price}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                      >
                        ${featured[0].oldPrice}
                      </Typography>
                      <Box
                        sx={{
                          ml: 1,
                          bgcolor: 'secondary.main',
                          color: '#0b0f14',
                          px: 1,
                          py: 0.3,
                          borderRadius: 1,
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        -{featured[0].discount}%
                      </Box>
                    </Stack>
                    <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
                      Ver producto
                    </Button>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>

            {/* Carrusel simple (horizontal) */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h5">Destacados de hoy</Typography>
              <Box>
                <IconButton onClick={() => scrollFeatured('left')} color="inherit">
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton onClick={() => scrollFeatured('right')} color="inherit">
                  <ChevronRightIcon />
                </IconButton>
              </Box>
            </Box>
            <Box
              ref={featuredRef}
              sx={{
                display: 'grid',
                gridAutoFlow: 'column',
                gridAutoColumns: 'minmax(240px, 1fr)',
                gap: 2,
                overflowX: 'auto',
                pb: 1,
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {featured.concat(offers).map((item) => (
                <Card key={item.name} sx={{ minWidth: 240 }}>
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{ width: '100%', height: 140, objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                      {item.desc}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                      <Typography fontWeight={700} color="secondary">
                        ${item.price}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                      >
                        ${item.oldPrice}
                      </Typography>
                      <Box
                        sx={{
                          ml: 'auto',
                          bgcolor: 'secondary.main',
                          color: '#0b0f14',
                          px: 1,
                          py: 0.2,
                          borderRadius: 1,
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        -{item.discount}%
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Seccion ofertas */}
            <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
              Ofertas
            </Typography>
            <Grid container spacing={2}>
              {offers.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.name}>
                  <Card sx={{ height: '100%' }}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{ width: '100%', height: 160, objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography variant="subtitle1">{item.name}</Typography>
                      <Typography color="text.secondary" sx={{ mt: 1 }}>
                        {item.desc}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                        <Typography fontWeight={700} color="secondary">
                          ${item.price}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                        >
                          ${item.oldPrice}
                        </Typography>
                        <Box
                          sx={{
                            ml: 'auto',
                            bgcolor: 'secondary.main',
                            color: '#0b0f14',
                            px: 1,
                            py: 0.2,
                            borderRadius: 1,
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
                          -{item.discount}%
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Seccion top sellers */}
            <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
              Top sellers
            </Typography>
            <Grid container spacing={2}>
              {featured.map((item) => (
                <Grid item xs={12} md={6} key={item.name}>
                  <Card>
                    <CardContent sx={{ display: 'flex', gap: 2 }}>
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.name}
                        sx={{ width: 140, height: 90, borderRadius: 1, objectFit: 'cover' }}
                      />
                      <Box>
                        <Typography variant="subtitle1">{item.name}</Typography>
                        <Typography color="text.secondary">{item.desc}</Typography>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                          <Typography fontWeight={700} color="secondary">
                            ${item.price}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                          >
                            ${item.oldPrice}
                          </Typography>
                          <Box
                            sx={{
                              ml: 'auto',
                              bgcolor: 'secondary.main',
                              color: '#0b0f14',
                              px: 1,
                              py: 0.2,
                              borderRadius: 1,
                              fontSize: 12,
                              fontWeight: 700,
                            }}
                          >
                            -{item.discount}%
                          </Box>
                        </Stack>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default App