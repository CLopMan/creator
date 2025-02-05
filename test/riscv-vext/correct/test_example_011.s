# lmulexp <= 1
# Test vloxei8
.data
index: .byte 14, 15, 12, 13, 10, 11, 8, 9, 6, 7, 4, 5, 2, 3, 0, 1 
values: .byte 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15

.text

main: 
    la t2 index
    la t4 values
    vle8.v v2 0(t2) # indexes

    vloxei8.v v4 (t4) v2 # 14, 15, 12, 13, 10, 11, 8, 9, 6, 7, 4, 5, 2, 3, 0, 1
    #vloxei8.v v6 0(t4) v2 v0.t