type ENV_TYPE = {
    PORT: number,
    MORGAN: string
}

const env: ENV_TYPE = {
    PORT: (process.env.PORT || 3000) as number,
    MORGAN: process.env.MORGAN || 'dev'
}

export default env