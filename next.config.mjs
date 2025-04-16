/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https', // Especifica el protocolo (http o https)
            hostname: 'cdn.pixabay.com', // El hostname del dominio de la imagen
            port: '', // Opcional: especifica el puerto si es diferente del estándar (80 para http, 443 para https)
            pathname: '/**', // Opcional: limita las rutas dentro del hostname que están permitidas (ej: '/photos/**')
          },
          // Puedes agregar más hostnames aquí si utilizas imágenes de otros dominios
        ],
      },
};

export default nextConfig;
