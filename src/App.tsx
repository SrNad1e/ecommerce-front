import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'

const products = [
  {
    name: 'Auriculares Aura',
    price: 129,
    desc: 'Sonido calido y diseno minimal.',
    image:
      'https://images.unsplash.com/photo-1518441902119-1e1a3e0c0063?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Teclado Linea',
    price: 99,
    desc: 'Perfil bajo, tacto suave.',
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Luz Ambito',
    price: 79,
    desc: 'Iluminacion suave para tu espacio.',
    image:
      'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Mouse Pulse',
    price: 59,
    desc: 'Preciso y comodo para el dia a dia.',
    image:
      'https://images.unsplash.com/photo-1585079542156-2755d9c6f220?auto=format&fit=crop&w=800&q=80',
  },
]

function App() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0} color="transparent">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight={700}>
            Ecommerce Studio
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button color="inherit">Catalogo</Button>
            <Button color="inherit">Colecciones</Button>
            <Button variant="contained" color="secondary">
              Entrar
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography variant="overline" color="text.secondary">
              Ecommerce minimal
            </Typography>
            <Typography variant="h1" sx={{ mt: 1 }}>
              Compra con calma.
              <br />
              Vende con estilo.
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 2, maxWidth: 520 }}>
              Catalogo curado, pagos simulados y una experiencia premium desde el
              primer clic.
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Button variant="contained" color="secondary">
                Explorar productos
              </Button>
              <Button variant="outlined" color="primary">
                Ver colecciones
              </Button>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ mt: 3, color: 'text.secondary' }}>
              <Typography variant="body2">+120 productos</Typography>
              <Typography variant="body2">Envio simulado 48h</Typography>
              <Typography variant="body2">Resenas reales</Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card elevation={8} sx={{ borderRadius: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="overline" color="secondary">
                  Nuevo
                </Typography>
                <Typography variant="h5" sx={{ mt: 1 }}>
                  Auriculares Aura
                </Typography>
                <Typography variant="h3" sx={{ mt: 1 }}>
                  $129
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Sonido calido y diseno minimal.
                </Typography>
                <Box
                  sx={{
                    mt: 3,
                    height: 180,
                    borderRadius: 3,
                    background:
                      'linear-gradient(135deg, #f7d7a3 0%, #f1b0d5 100%)',
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ pb: 10 }}>
        <Stack spacing={4}>
          <Box>
            <Typography variant="h2">Categorias destacadas</Typography>
            <Typography color="text.secondary">
              Una seleccion pequena y bien pensada.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {[
              { title: 'Audio', text: 'Equipos limpios y potentes para el dia a dia.' },
              { title: 'Workspace', text: 'Herramientas que te ayudan a concentrarte.' },
              { title: 'Movilidad', text: 'Ligero, comodo y siempre listo.' },
            ].map((item) => (
              <Grid item xs={12} md={4} key={item.title}>
                <Card elevation={4} sx={{ borderRadius: 4, height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      {item.text}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Card elevation={0} sx={{ bgcolor: '#f6f4f0', borderRadius: 4, p: 4 }}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="h2">Catalogo</Typography>
                <Typography color="text.secondary">
                  Productos seleccionados para una experiencia limpia.
                </Typography>
              </Box>

              <Grid container spacing={3}>
                {products.map((product) => (
                  <Grid item xs={12} md={3} key={product.name}>
                    <Card elevation={2} sx={{ borderRadius: 4 }}>
                      <CardContent>
                        <Box
                          component="img"
                          src={product.image}
                          alt={product.name}
                          sx={{
                            height: 120,
                            width: '100%',
                            objectFit: 'cover',
                            borderRadius: 3,
                            mb: 2,
                          }}
                        />
                        <Typography variant="h6">{product.name}</Typography>
                        <Typography color="text.secondary" sx={{ mt: 1 }}>
                          {product.desc}
                        </Typography>
                        <Typography fontWeight={700} sx={{ mt: 2 }}>
                          ${product.price}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Card>

          <Card elevation={0} sx={{ bgcolor: '#0d0f12', color: '#f8f8f8', p: 4, borderRadius: 4 }}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              alignItems={{ xs: 'flex-start', md: 'center' }}
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4">Listo para tu proximo proyecto?</Typography>
                <Typography sx={{ mt: 1, color: 'rgba(255,255,255,0.7)' }}>
                  Integra este front con tu backend NestJS en minutos.
                </Typography>
              </Box>
              <Button variant="contained" color="secondary">
                Conectar API
              </Button>
            </Stack>
          </Card>
        </Stack>
      </Container>

      <Box sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>
        Ecommerce Backoffice 2026 · Hecho para portafolio
      </Box>
    </Box>
  )
}

export default App