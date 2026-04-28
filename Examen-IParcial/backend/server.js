import express from 'express';
import { aggregateByPeriod } from './logic/timeAggregator.js';

const app = express();
app.use(express.json());

/**
 * Endpoint:
 * /api/organigrama/resumen?plazo=mensual
 * plazos soportados: semanal | mensual | anual
 */
app.get('/api/organigrama/resumen', async (req, res) => {
    const { plazo } = req.query;

    if (!['semanal', 'mensual', 'anual'].includes(plazo)) {
        return res.status(400).json({
            error: 'Plazo inválido. Use semanal, mensual o anual'
        });
    }

    try {
        const resumen = await aggregateByPeriod(plazo);
        res.json(resumen);
    } catch (error) {
        res.status(500).json({
            error: 'Error procesando el organigrama',
            detalle: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
