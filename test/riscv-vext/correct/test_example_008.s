# lmulexp <= 1
# test masked le se byte sized
.data
result: .byte -1, 2, -3, 4, -5, 6, -7, 8, -9, 10, -11, 12, -13, 14, -15, 16, -17, 18, -19, 20, -21, 22, -23, 24, -25, 26, -27, 28, -29, 30, -31, 32 

store: .byte 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
store_masked: .byte 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
.text

main: 
    la t0 result
    addi t1 x0 7

    vadd.vi v0 v0 7 # mask 3 primeros valores
    vadd.vi v2 v2 2 #tu and mu must preserve these values
    vadd.vi v4 v4 4

    vle8.v v2 0(t0) v0.t # load with mask
    vle8.v v4 0(t0) # load without mask

    la t1 store
    la t2 store_masked

    vse8.v v4 0(t1)
    vse8.v v4 0(t2) v0.t

    vle8.v v6 0(t1)
    vle8.v v8 0(t2)
