import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function BreadcrumbsNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
      <Link color="inherit" onClick={() => navigate('/')} underline="hover" style={{ cursor: 'pointer' }}>
        Inicio
      </Link>
      {pathnames.map((value, index) => {
        const to = '/' + pathnames.slice(0, index + 1).join('/');
        const isLast = index === pathnames.length - 1;
        const nombre = isNaN(value) ? decodeURIComponent(value) : `ID ${value}`;

        return isLast ? (
          <Typography color="text.primary" key={to}>{nombre}</Typography>
        ) : (
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate(to)}
            key={to}
            style={{ cursor: 'pointer' }}
          >
            {nombre}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default BreadcrumbsNav;
