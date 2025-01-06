.text
main:
    li t0 65536
    li t1 15
loop:
    addi t1 t1 -1
    add t0 t0 t0
    bnez t1 loop

    vadd.vx v1 v1 t0
    vsub.vx v2 v2 t0