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
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
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

  const [products, setProducts] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [cartOpen, setCartOpen] = useState(false)


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products')
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

  if (loading) {
    return <Box sx={{ p: 4, color: 'text.secondary' }}>Cargando productos...</Box>
  }

  if (error) {
    return <Box sx={{ p: 4, color: 'error.main' }}>{error}</Box>
  }

  const featuredProducts = products.slice(0, 2)
  const offersProducts = products.slice(0, 6)

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
                <IconButton color="secondary" aria-label="add to shopping cart">
                  <AddShoppingCartIcon />
                </IconButton>
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
                  {['Audio', 'Workspace', 'Gaming', 'Streaming', 'Accesorios'].map((cat) => (
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
                    src={products[7].imageUrl}
                    alt={products[7].name}
                    sx={{ width: '100%', height: 320, objectFit: 'cover' }}
                  />
                </Grid>
                <Grid item xs={12} md={5}>
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
            <Grid container spacing={2} ref={featuredRef} sx={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridAutoColumns: 'minmax(240px, 1fr)',
              gap: 2,
              overflowX: 'auto',
              pb: 1,
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}>
              {offersProducts.map((item: any) => (
                <Grid item xs={12} sm={6} md={4} key={item.name}>
                  <Card onClick={() => setSelectedProduct(item)} sx={{ p: 2, cursor: 'pointer', height: 350, width: 250 }}>
                    <Box
                      component="img"
                      src={item.imageUrl}
                      alt={item.name}
                      sx={{ width: '100%', height: 160, objectFit: 'cover' }}
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
    </Box>
  )
}

export default App