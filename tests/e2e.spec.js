import { test } from '@playwright/test';

const NUM_PLAYERS = 4;

async function join_player(context, name) {
    const page1 = await context.newPage();
    await page1.goto('http://localhost:5173/');
    await page1.getByPlaceholder('Nombre del jugador').fill(name);
    await page1.getByRole('button', { name: 'Ver Listas De partidas' }).click();
    await page1.getByRole('button', { name: 'Unirse' }).click();
}

test('has title', async ({ page, context }) => {
    // host
    let host = page
    await host.goto('http://localhost:5173/');
    await host.getByPlaceholder('Nombre del anfitrion').click();
    await host.getByPlaceholder('Nombre del anfitrion').fill('host');
    await host.getByPlaceholder('Nombre de la partida').click();
    await host.getByPlaceholder('Nombre de la partida').fill('partida');
    await host.getByRole('button', { name: 'Crear partida' }).click();

    // P1
    for (let i = 0; i < NUM_PLAYERS-1; i++) {
        await join_player(context, 'p' + i);
    }
    await host.getByRole('button', { name: 'Iniciar partida' }).click();
    await new Promise(() => {})
});
