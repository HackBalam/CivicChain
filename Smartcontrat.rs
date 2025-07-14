#![no_std]

use soroban_sdk::{contract, contractimpl, symbol_short, Env, Symbol, Map, Address, String, Vec, BytesN};

#[contract]
pub struct TrafficFineContract;

#[derive(Clone)]
pub struct Fine {
    pub id: BytesN<32>,
    pub amount: i128,
    pub reason: String,
    pub paid: bool,
    pub owner: Address,
}

const FINES_KEY: Symbol = symbol_short!("FINES");

#[contractimpl]
impl TrafficFineContract {
    // Registrar una nueva multa
    pub fn register_fine(env: Env, id: BytesN<32>, amount: i128, reason: String, owner: Address) {
        let mut fines: Map<BytesN<32>, Fine> = env
            .storage()
            .instance()
            .get(&FINES_KEY)
            .unwrap_or(Map::new(&env));

        if fines.contains_key(&id) {
            panic!("Multa con este ID ya existe");
        }

        let fine = Fine {
            id: id.clone(),
            amount,
            reason,
            paid: false,
            owner,
        };

        fines.set(id, fine);
        env.storage().instance().set(&FINES_KEY, &fines);
    }

    // Pagar una multa existente
    pub fn pay_fine(env: Env, id: BytesN<32>, sender: Address) {
        let mut fines: Map<BytesN<32>, Fine> = env
            .storage()
            .instance()
            .get(&FINES_KEY)
            .unwrap_or(Map::new(&env));

        let mut fine = fines
            .get(id.clone())
            .unwrap_or_else(|| panic!("Multa no encontrada"));

        if fine.owner != sender {
            panic!("No eres el dueño de esta multa");
        }

        if fine.paid {
            panic!("La multa ya fue pagada");
        }

        fine.paid = true;
        fines.set(id.clone(), fine);
        env.storage().instance().set(&FINES_KEY, &fines);
    }

    // Consultar detalles de una multa
    pub fn get_fine(env: Env, id: BytesN<32>) -> (i128, String, bool, Address) {
        let fines: Map<BytesN<32>, Fine> = env
            .storage()
            .instance()
            .get(&FINES_KEY)
            .unwrap_or(Map::new(&env));

        let fine = fines
            .get(id.clone())
            .unwrap_or_else(|| panic!("Multa no encontrada"));

        (fine.amount, fine.reason, fine.paid, fine.owner)
    }

    // Verificar si una multa fue pagada
    pub fn is_paid(env: Env, id: BytesN<32>) -> bool {
        let fines: Map<BytesN<32>, Fine> = env
            .storage()
            .instance()
            .get(&FINES_KEY)
            .unwrap_or(Map::new(&env));

        let fine = fines
            .get(id.clone())
            .unwrap_or_else(|| panic!("Multa no encontrada"));

        fine.paid
    }
}
