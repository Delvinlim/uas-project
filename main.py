print("Pilihan = 1, 2, 3, 4")
pilihan = int(input('masukkan pilihan: '))
num = int(input('masukkan jumlah: '))

def pilih():
  if pilihan == 1:
    pilihanSatu(num)
  elif pilihan == 2:
    pilihanDua(num)
  elif pilihan == 3:
    pilihanTiga(num)
  else:
    pilihanEmpat(num)

def pilihanSatu(num):
  for i in range(0, num+1):
    print(i * "*")

def pilihanDua(num):
  for i in range(num, 0, -1):
    print(i * "*")

def pilihanTiga(num):
  spacing = 0 
  for i in range(0, num):
      for j in range(0, spacing):
          print(' ',end='')
      spacing += 2
      for j in range(0, num):
          print('* ' , end='')
      num -= 1
      print('')

def pilihanEmpat(num):
  spacing = 2 * num - 2
  for i in range(0, num):
      for j in range(0, spacing):
          print(' ',end='')
      spacing -= 2
      for j in range(0, i + 1):
          print('* ', end='')
      print('')
  
pilih()
