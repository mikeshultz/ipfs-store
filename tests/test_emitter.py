HELLO_WORLD = 'QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx'

def test_emitter(chain):
    emitter, _ = chain.provider.get_or_deploy_contract('IpfsEmitter')

    tx = emitter.transact().add(HELLO_WORLD)
    chain.wait.for_receipt(tx)
    
    print(tx)