import {
  AppBar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  InputBase,
  Stack,
  Toolbar,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useEffect, useRef, useState } from 'react'


function App() {

  const featuredRef = useRef<HTMLDivElement | null>(null)

  const scrollFeatured = (direction: 'left' | 'right') => {
    if (!featuredRef.current) return
    const amount = direction === 'left' ? -320 : 320
    featuredRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  const offersRef = useRef<HTMLDivElement | null>(null)

  const scrollOffers = (direction: 'left' | 'right') => {
    if (!offersRef.current) return
    const amount = direction === 'left' ? -320 : 320
    offersRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  const [products, setProducts] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authName, setAuthName] = useState('')
  const [authError, setAuthError] = useState<string | null>(null)
  const [isAuthed, setIsAuthed] = useState(Boolean(localStorage.getItem('token')))


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/products`)
        if (!response.ok) {
          throw new Error('No se pudieron cargar los productos')
        }
        const data = await response.json()
        setProducts(data)
        setError(null)
      } catch (error) {
        console.error('Error fetching products:', error)
        setError('No se pudieron cargar los productos')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleAuth = async () => {
    try {
      setAuthError(null)

      const endpoint =
        authMode === 'login'
          ? `${import.meta.env.VITE_API_URL}/auth/login`
          : `${import.meta.env.VITE_API_URL}/auth/register`

      const payload =
        authMode === 'login'
          ? { email: authEmail, password: authPassword }
          : { name: authName, email: authEmail, password: authPassword }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Credenciales invalidas')
      }

      const data = await response.json()

      // Guardamos el token en localStorage
      localStorage.setItem('token', data.access_token)
      setIsAuthed(true)

      // Limpia campos y cierra modal
      setAuthEmail('')
      setAuthPassword('')
      setAuthName('')
      setAuthOpen(false)
    } catch (err) {
      setAuthError('No se pudo iniciar sesion')
    }
  }

  if (loading) {
    return <Box sx={{ p: 4, color: 'text.secondary' }}>Cargando productos...</Box>
  }

  if (error) {
    return <Box sx={{ p: 4, color: 'error.main' }}>{error}</Box>
  }

  const featuredProducts = products.slice(0, 2)
  const offersProducts = products.slice(0, 6)

  const PriceBlock = ({ price, oldPrice, discount }: any) => (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
      <Typography fontWeight={700} color="secondary">
        ${price}
      </Typography>
      <Typography
        variant="body2"
        sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
      >
        ${oldPrice}
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
        -{discount}%
      </Box>
    </Stack>
  )

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" color="transparent" elevation={0}>
        <Container>
          <Toolbar sx={{ gap: 3 }}>
            <Typography variant="h6" fontWeight={700}>
              GameShop
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
              <Badge color="secondary" badgeContent={cartItems.length}>
                <IconButton onClick={() => setCartOpen(true)} color="secondary" aria-label="add to shopping cart">
                  <ShoppingCartIcon />
                </IconButton>
              </Badge>
            </Stack>
            {isAuthed ? (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  localStorage.removeItem('token')
                  setIsAuthed(false)
                }}
              >
                Salir
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setAuthMode('login')
                  setAuthOpen(true)
                }}
              >
                Entrar
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ mt: 3, mb: 2, textAlign: 'center' }}>
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
          Categorias
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Audio', 'Workspace', 'Gaming', 'Streaming', 'Accesorios'].map((cat) => (
            <Button key={cat} color="inherit" size="small">
              {cat}
            </Button>
          ))}
        </Stack>
      </Box>
      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            {/* Banner grande */}
            <Card sx={{ mb: 3, overflow: 'hidden' }}>
              <Grid container>
                <Grid size={{ xs: 12, md: 7 }}>
                  <Box
                    component="img"
                    src={products[7].imageUrl}
                    alt={products[7].name}
                    sx={{ width: '100%', height: 320, objectFit: 'cover' }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 5 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="overline" color="secondary">
                      Oferta destacada
                    </Typography>
                    <Typography variant="h4">{products[7].name}</Typography>
                    <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 420 }}>
                      Audio balanceado, materiales premium y descuento limitado por tiempo corto.
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
                      <Typography variant="h5" color="secondary">
                        ${products[7].price}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                      >
                        ${products[7].oldPrice}
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
                        -{products[7].discount}%
                      </Box>
                    </Stack>
                    <Button onClick={() => setSelectedProduct(products[7])} variant="contained" color="secondary" sx={{ mt: 2 }}>
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
              {featuredProducts.concat(products).map((item: any) => (
                <Card onClick={() => setSelectedProduct(item)} sx={{ p: 2, cursor: 'pointer', height: 350, width: 250 }}>
                  <Box
                    component="img"
                    src={item.imageUrl}
                    alt={item.name}
                    sx={{ width: '100%', height: 140, objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Typography color="text.secondary" sx={{
                      mt: 0.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {item.description}
                    </Typography>
                    <PriceBlock price={item.price} oldPrice={item.oldPrice} discount={item.discount} />
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Seccion ofertas */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h5">Ofertas</Typography>
              <Box>
                <IconButton onClick={() => scrollOffers('left')} color="inherit">
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton onClick={() => scrollOffers('right')} color="inherit">
                  <ChevronRightIcon />
                </IconButton>
              </Box>
            </Box>
            <Box
              ref={offersRef}
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
              {offersProducts.map((item: any) => (
                <Card
                  key={item.name}
                  onClick={() => setSelectedProduct(item)}
                  sx={{ p: 2, cursor: 'pointer', width: 250 }}
                >
                  <Box
                    component="img"
                    src={item.imageUrl}
                    alt={item.name}
                    sx={{ width: '100%', height: 160, objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Typography
                      color="text.secondary"
                      sx={{
                        mt: 0.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.description}
                    </Typography>
                    <PriceBlock price={item.price} oldPrice={item.oldPrice} discount={item.discount} />
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Dialog
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{selectedProduct?.name}</DialogTitle>
        <DialogContent>
          {selectedProduct?.imageUrl && (
            <Box
              component="img"
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              sx={{
                width: '100%',
                height: 220,
                objectFit: 'cover',
                borderRadius: 2,
                mb: 2,
              }}
            />
          )}
          <Typography color="text.secondary">
            {selectedProduct?.description}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
            <Typography fontWeight={700} color="secondary">
              ${selectedProduct?.price}
            </Typography>
            <Typography
              variant="body2"
              sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
            >
              ${selectedProduct?.oldPrice}
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
              -{selectedProduct?.discount}%
            </Box>
          </Stack>
          <Badge sx={{ mt: 3 }} color="primary" badgeContent={cartItems.length}>
            <Button
              startIcon={<AddShoppingCartIcon />}
              variant="contained"
              color="secondary"

              onClick={() => {
                if (selectedProduct) {
                  setCartItems((prev) => [...prev, selectedProduct])
                }
              }}
            >
              Agregar al carrito
            </Button>
          </Badge>
        </DialogContent>
      </Dialog>
      <Dialog open={cartOpen} onClose={() => setCartOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Carrito</DialogTitle>
        <DialogContent>
          {cartItems.length === 0 ? (
            <Typography color="text.secondary">Tu carrito esta vacio.</Typography>
          ) : (
            <Stack spacing={2}>
              {cartItems.map((item, idx) => (
                <Card key={`${item._id || item.name}-${idx}`} sx={{ p: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {item.imageUrl && (
                      <Box
                        component="img"
                        src={item.imageUrl}
                        alt={item.name}
                        sx={{ width: 80, height: 60, borderRadius: 1, objectFit: 'cover' }}
                      />
                    )}
                    <Box sx={{ flex: 1 }}>
                      <Typography fontWeight={600}>{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${item.price}
                      </Typography>
                    </Box>
                    <Button
                      color="inherit"
                      onClick={() =>
                        setCartItems((prev) => prev.filter((_, i) => i !== idx))
                      }
                    >
                      Quitar
                    </Button>
                  </Stack>
                </Card>
              ))}
            </Stack>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={authOpen} onClose={() => setAuthOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          {authMode === 'login' ? 'Iniciar sesion' : 'Crear cuenta'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {authMode === 'register' && (
              <TextField
                label="Nombre"
                value={authName}
                onChange={(e) => setAuthName(e.target.value)}
                fullWidth
              />
            )}
            <TextField
              label="Email"
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
              fullWidth
            />
            {authError && (
              <Typography color="error.main" variant="body2">
                {authError}
              </Typography>
            )}
            <Button variant="contained" color="secondary" onClick={() => handleAuth()}>
              {authMode === 'login' ? 'Entrar' : 'Registrarme'}
            </Button>
            <Button
              color="inherit"
              onClick={() =>
                setAuthMode((prev) => (prev === 'login' ? 'register' : 'login'))
              }
            >
              {authMode === 'login'
                ? 'No tienes cuenta? Registrate'
                : 'Ya tienes cuenta? Inicia sesion'}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default App