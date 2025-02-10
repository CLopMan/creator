# lmulexp <= 1
# Test vloxei8
.data
index: .byte 1, 0, 3, 2, 5, 4, 7, 6, 9, 8, 11, 10, 13, 12, 15, 14
values: .byte 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15

.text

main: 
    la t2 index
    la t4 values
    vle8.v v2 0(t2) # indexes
    vadd.vi v6 v6 1
    vadd.vi v0 v0 7
    

    vloxei8.v v4 (t4) v2 # 1, 0, 
    vloxei8.v v6 (t4) v2 v0.t 